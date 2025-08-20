import React from 'react';
import FeatureCard from '../components/features/FeatureCard';
import VideoUploadForm from '../components/video/VideoUploadForm';

// Import your new feature images
import aiModelImage from '../assets/images/ai-model.png';
import fastResponsesImage from '../assets/images/fast-responses.png';
import privacyShieldImage from '../assets/images/privacy-shield.png';

const HomePage = () => {
  // A simple fade-in effect hook (can be moved to a separate file)
  React.useEffect(() => {
    const faders = document.querySelectorAll('.fade-in');
    const appearOptions = {
      threshold: 0.2,
      rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('visible');
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });
  }, []);

  return (
    <main>
      {/* Hero Section */}
      <section id="home" className="hero-bg pt-32 pb-20 md:pt-48 md:pb-32 text-center overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 hero-content">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-4 fade-in">
                Transform Meetings into Insights
            </h1>
            <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto mb-8 fade-in" style={{transitionDelay: '0.2s'}}>
                Stop wasting time on long recordings. InsightBot uses AI to deliver concise, actionable summaries in minutes.
            </p>
            <a href="#video-insights" className="hero-button fade-in" style={{transitionDelay: '0.4s'}}>
                Try InsightBot Now <i className="fas fa-arrow-right ml-2"></i>
            </a>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Explore InsightBot's Capabilities</h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">From creative writing to complex code generation, discover what's possible.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard imageSrc={aiModelImage} title="Advanced AI Model">
              Powered by a state-of-the-art language model, InsightBot understands context, nuance, and complex queries with remarkable accuracy.
            </FeatureCard>
            <FeatureCard imageSrc={fastResponsesImage} title="Lightning-Fast Responses">
              Get instant answers and solutions. Our optimized infrastructure ensures minimal latency for a smooth, real-time experience.
            </FeatureCard>
            <FeatureCard imageSrc={privacyShieldImage} title="Privacy First">
              Your conversations are your own. We are committed to user privacy with robust encryption and data protection policies.
            </FeatureCard>
          </div>
        </div>
      </section>

      {/* Video Insights Section */}
      <section id="video-insights" className="py-20 bg-gray-900/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 fade-in">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Get Insights from Your Meetings</h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">Upload a video of your meeting and get a summary of the key points.</p>
          </div>
          <VideoUploadForm />
        </div>
      </section>

      {/* About and Contact Sections can be added here */}
    </main>
  );
};

export default HomePage;
