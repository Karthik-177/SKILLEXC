import { motion } from 'motion/react';
import { ArrowRight, Code, Users, Trophy, BookOpen, MessageCircle, Star } from 'lucide-react';
import { Button } from './ui/button';
import { useAuth } from '../App';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleJoinAsStudent = () => {
    login('student@test.com', 'password');
    navigate('/auth');
  };

  const handleJoinAsMentor = () => {
    login('mentor@test.com', 'password');
    navigate('/profile');
  };

  const features = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Connect with Mentors",
      description: "Join a community of experienced developers ready to guide your journey",
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "Practice Coding",
      description: "Solve problems, take assignments, and improve your programming skills",
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "Real-time Chat",
      description: "Communicate with mentors and peers through our integrated chat system",
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: "Earn Badges",
      description: "Get recognized for your achievements and track your progress",
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Learn Together",
      description: "Join study groups and collaborative coding sessions",
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Get Rated",
      description: "Build your reputation and help others discover great mentors",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          <motion.div
            className="absolute top-1/2 right-20 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"
            animate={{
              x: [0, -80, 0],
              y: [0, 60, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          <motion.div
            className="absolute bottom-20 left-1/3 w-64 h-64 bg-blue-400/15 rounded-full blur-3xl"
            animate={{
              x: [0, 120, 0],
              y: [0, -80, 0],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl lg:text-7xl mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
              Connect. Learn. Mentor.
            </h1>
            <p className="text-xl lg:text-2xl mb-12 text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Join the ultimate mentorship and coding ecosystem where students connect with experienced developers,
              practice coding challenges, and grow together as a community.
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Button
              onClick={handleJoinAsStudent}
              className="group relative bg-white/10 hover:bg-white/20 backdrop-blur-lg border border-white/20 text-white px-8 py-4 text-lg rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25"
            >
              <span className="flex items-center gap-2">
                Join as Student
                <motion.div
                  className="group-hover:translate-x-1 transition-transform duration-300"
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>

          
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2" />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl text-white mb-6">
              Why Choose Our Platform?
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Everything you need to accelerate your coding journey and build meaningful connections
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="group relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/10"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-blue-300 mb-4 group-hover:text-blue-200 transition-colors duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl text-white mb-3 group-hover:text-blue-100 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-blue-200 group-hover:text-blue-100 transition-colors duration-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-12">
            <h2 className="text-3xl lg:text-4xl text-white mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of developers who are already growing their skills and building their careers
            </p>
            <Button
              onClick={handleJoinAsStudent}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-white px-8 py-4 text-lg rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
            >
              Get Started Today
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}