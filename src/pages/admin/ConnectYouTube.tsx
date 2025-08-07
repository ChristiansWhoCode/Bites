import React from "react";
import { Play } from "lucide-react";
import Button from "../../components/ui/Button/Button";
import { useAuth } from "../../contexts/AuthContext";

const ConnectYouTube: React.FC = () => {
  const { token } = useAuth();

  const connectYouTube = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/youtube/auth-url`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 401) {
        alert("Authentication required - please log in again");
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to get YouTube auth URL");
      }

      const { auth_url } = await response.json();
      window.location.href = auth_url;
    } catch (error) {
      console.error(error);
      alert("Failed to connect YouTube - please try again");
    }
  };

  return (
    <Button variant="admin" onClick={connectYouTube}>
      <Play size={24} className="mb-xs pixelated" />
      <span className="mt-xs">Connect YouTube Channel</span>
    </Button>
  );
};

export default ConnectYouTube;
