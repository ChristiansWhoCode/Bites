// src/components/auth/GoogleLoginButton.tsx
import React, { useEffect, useRef, useState, useCallback } from "react";
import "./GoogleLoginButton.scss";
import { CircleUser } from "lucide-react";
import Button from "../ui/Button/Button";
import type { User } from "../../contexts/AuthContext";

// Extend the Window interface to include the 'google' property
declare global {
  interface Window {
    google?: any;
  }
}

interface GoogleLoginButtonProps {
  onSuccess?: (user: User, token: string) => void;
  onError?: (error: string) => void;
  disabled?: boolean;
}

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({
  onSuccess,
  onError,
  disabled = false,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const googleButtonRef = useRef<HTMLDivElement>(null);

  // Load Google Identity Services script
  useEffect(() => {
    const loadGoogleScript = () => {
      if (window.google) {
        setScriptLoaded(true);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.onload = () => setScriptLoaded(true);
      document.head.appendChild(script);
    };

    loadGoogleScript();
  }, []);

  // Move handleGoogleResponse definition (with useCallback) here, before the useEffect that uses it
  const handleGoogleResponse = useCallback(
    async (response: any) => {
      setIsLoading(true);

      try {
        const googleToken = response.credential;

        // Call your backend auth endpoint
        const authResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/api/auth/google`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token: googleToken }),
          }
        );

        if (authResponse.status === 403) {
          throw new Error(
            "Access denied - you are not authorized to use this application"
          );
        }

        if (!authResponse.ok) {
          throw new Error("Authentication failed");
        }

        const { access_token } = await authResponse.json();

        // Store token (adjust storage method as needed)
        localStorage.setItem("access_token", access_token);

        // Decode JWT to get user info (optional)
        const payload = JSON.parse(atob(access_token.split(".")[1]));

        onSuccess?.(payload, access_token); // Ensure access_token is passed here
      } catch (error) {
        console.error("Google login error:", error);
        onError?.(error instanceof Error ? error.message : "Login failed");
      } finally {
        setIsLoading(false);
      }
    },
    [onSuccess, onError]
  ); // Dependencies for useCallback

  // Initialize Google OAuth and render button when script loads
  // This useEffect now has access to handleGoogleResponse because it's defined above
  useEffect(() => {
    if (!scriptLoaded || !window.google || !googleButtonRef.current) return;

    window.google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: handleGoogleResponse,
      use_fedcm_for_prompt: false,
    });

    window.google.accounts.id.renderButton(googleButtonRef.current, {
      theme: "outline",
      size: "large",
    });
  }, [scriptLoaded, handleGoogleResponse]);

  return (
    <>
      {/* This is the div where Google will render its button */}
      <div
        id="google-signin-button"
        ref={googleButtonRef}
        style={{ display: scriptLoaded && !isLoading ? "block" : "none" }}
      ></div>

      {(!scriptLoaded || isLoading) && (
        <Button
          variant="default"
          className={`${isLoading ? "loading" : ""}`}
          disabled={true}
        >
          <div className="google-login-content">
            {isLoading ? (
              <>
                <div className="spinner"></div>
                <span>Signing in...</span>
              </>
            ) : (
              <>
                <CircleUser size={20} style={{ marginRight: 8 }} />
                <span>Loading Google Sign-In...</span>
              </>
            )}
          </div>
        </Button>
      )}
    </>
  );
};

export default GoogleLoginButton;
