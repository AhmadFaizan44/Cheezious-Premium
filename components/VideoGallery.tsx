
import React from 'react';
import { VideoItem } from '../types';

interface VideoGalleryProps {
  videos: VideoItem[];
}

const VideoGallery: React.FC<VideoGalleryProps> = ({ videos }) => {
  return (
    <div className="py-20 px-6 max-w-7xl mx-auto">
      <h2 className="text-4xl font-serif text-brand-yellow mb-12 text-center uppercase tracking-wider">
        Cheezious Motions
      </h2>
      
      {videos.length === 0 ? (
        <div className="text-center text-gray-500 py-20">
          <p>No videos available yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {videos.map((video) => (
            <div key={video.id} className="group relative bg-brand-gray rounded-xl overflow-hidden shadow-2xl border border-white/5 hover:border-brand-yellow/30 transition-all">
              <div className="aspect-video relative">
                 <video 
                   src={video.videoUrl} 
                   controls 
                   className="w-full h-full object-cover"
                   poster={video.thumbnailUrl}
                 />
              </div>
              <div className="p-6 bg-black/40">
                <h3 className="text-xl font-bold text-brand-cream group-hover:text-brand-yellow transition-colors">{video.title}</h3>
                <p className="text-xs text-gray-500 mt-2 uppercase tracking-widest">Featured Content</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VideoGallery;
