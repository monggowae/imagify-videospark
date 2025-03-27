
import { toast } from "sonner";

// Placeholder functions that would connect to real AI services

// Mock data for demo purposes
const mockImagesResponse = [
  "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1518877593221-1f28583780b4?w=800&auto=format&fit=crop",
];

// Sample video URLs (these are not real videos, just placeholders)
const mockVideosResponse = [
  "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
];

// Simulate API request with artificial delay
const simulateApiRequest = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

interface GenerationResult {
  url: string;
  alt?: string;
}

/**
 * Generate an image from a text prompt
 * @param prompt Text description
 * @returns Promise with the generated image URL
 */
export const generateImage = async (prompt: string): Promise<GenerationResult> => {
  try {
    // Simulate API call
    await simulateApiRequest(Math.floor(Math.random() * 2000) + 1000);
    
    // In a real implementation, this would call an AI service API
    const randomIndex = Math.floor(Math.random() * mockImagesResponse.length);
    
    return {
      url: mockImagesResponse[randomIndex],
      alt: prompt
    };
  } catch (error) {
    console.error("Image generation failed:", error);
    toast.error("Failed to generate image. Please try again.");
    throw error;
  }
};

/**
 * Generate a short video from a text prompt
 * @param prompt Text description
 * @returns Promise with the generated video URL
 */
export const generateVideo = async (prompt: string): Promise<GenerationResult> => {
  try {
    // Simulate API call (video takes longer)
    await simulateApiRequest(Math.floor(Math.random() * 3000) + 2000);
    
    // In a real implementation, this would call an AI service API
    const randomIndex = Math.floor(Math.random() * mockVideosResponse.length);
    
    return {
      url: mockVideosResponse[randomIndex],
      alt: prompt
    };
  } catch (error) {
    console.error("Video generation failed:", error);
    toast.error("Failed to generate video. Please try again.");
    throw error;
  }
};

/**
 * Save creations to local storage
 */
export const saveCreations = (creations: any[]) => {
  try {
    localStorage.setItem("creations", JSON.stringify(creations));
  } catch (error) {
    console.error("Failed to save creations:", error);
  }
};

/**
 * Load creations from local storage
 */
export const loadCreations = () => {
  try {
    const savedCreations = localStorage.getItem("creations");
    if (savedCreations) {
      const parsedCreations = JSON.parse(savedCreations);
      // Convert string dates back to Date objects
      return parsedCreations.map((creation: any) => ({
        ...creation,
        createdAt: new Date(creation.createdAt)
      }));
    }
    return [];
  } catch (error) {
    console.error("Failed to load creations:", error);
    return [];
  }
};
