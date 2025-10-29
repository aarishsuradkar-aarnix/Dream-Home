import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import ImageGenerationSpinner from './ImageGenerationSpinner';
import { SparklesIcon } from './IconComponents';

const ImageGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt) {
      setError('Please enter a description for the property.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
      const response = await ai.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt: prompt,
        config: {
          numberOfImages: 1,
          outputMimeType: 'image/jpeg',
          aspectRatio: '16:9',
        },
      });

      if (response.generatedImages && response.generatedImages.length > 0) {
        const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
        const imageUrl = `data:image/jpeg;base64,${base64ImageBytes}`;
        setGeneratedImage(imageUrl);
      } else {
        setError('Image generation failed. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 py-16 px-4 overflow-hidden sm:px-6 lg:px-8 lg:py-24">
      <div className="relative max-w-xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Generate a Stunning Property Image</h2>
          <p className="mt-4 text-lg leading-6 text-gray-500 dark:text-gray-400">
            Describe your property, and our AI will create a beautiful, high-quality image for your listing.
          </p>
        </div>
        <div className="mt-12">
          <form onSubmit={handleGenerateImage} className="grid grid-cols-1 gap-y-6">
            <div>
              <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Property Description</label>
              <div className="mt-1">
                <textarea
                  id="prompt"
                  name="prompt"
                  rows={4}
                  className="py-3 px-4 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g., A modern 3BHK apartment in Mumbai with a sea view and minimalist interior, photorealistic, 8k"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary-800 hover:bg-primary-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating...
                  </>
                ) : (
                    <>
                    <SparklesIcon className="w-5 h-5 mr-2 -ml-1" />
                    Generate Image
                    </>
                )}
              </button>
            </div>
          </form>
        </div>

        {error && (
            <div className="mt-8 text-center text-red-500 bg-red-100 dark:bg-red-900/20 p-4 rounded-md">
                <p><strong>Error:</strong> {error}</p>
            </div>
        )}

        <div className="mt-12 text-center">
            {isLoading && <ImageGenerationSpinner />}
            {generatedImage && !isLoading && (
                <div className="animate-fade-in-up">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Generated Property Image</h3>
                    <img src={generatedImage} alt="AI-generated property" className="rounded-lg shadow-xl w-full mx-auto" />
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default ImageGenerator;
