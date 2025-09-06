import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  Filter, 
  Users, 
  MessageCircle, 
  Phone, 
  Star,
  MapPin,
  Code,
  Calendar,
  UserPlus,
  UserCheck,
  Grid,
  List
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Card, CardContent } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner@2.0.3';

// Mock users data
const mockUsers = [
  {
    id: '1',
    name: 'Sarah Chen',
    role: 'Senior Frontend Developer',
    company: 'Google',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b056b2a5?w=150&h=150&fit=crop&crop=face',
    rating: 4.9,
    location: 'Mountain View, CA',
    skills: ['React', 'TypeScript', 'GraphQL'],
    isMentor: true,
    isConnected: false,
    requestSent: false,
    lastActive: '2 hours ago',
    mentoringRate: '$150/hr',
    bio: 'Frontend architect with 8+ years experience building scalable web applications.'
  },
  {
    id: '2',
    name: 'Marcus Johnson',
    role: 'Full Stack Engineer',
    company: 'Stripe',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    rating: 4.8,
    location: 'San Francisco, CA',
    skills: ['Node.js', 'Python', 'AWS'],
    isMentor: true,
    isConnected: true,
    requestSent: false,
    lastActive: '1 hour ago',
    mentoringRate: '$120/hr',
    bio: 'Backend specialist helping developers master server-side technologies.'
  },
  {
    id: '3',
    name: 'Emma Wilson',
    role: 'ML Engineer',
    company: 'OpenAI',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    rating: 4.9,
    location: 'Seattle, WA',
    skills: ['Python', 'TensorFlow', 'PyTorch'],
    isMentor: true,
    isConnected: false,
    requestSent: true,
    lastActive: '30 min ago',
    mentoringRate: '$200/hr',
    bio: 'AI/ML researcher passionate about teaching machine learning concepts.'
  },
  {
    id: '4',
    name: 'Alex Rivera',
    role: 'DevOps Engineer',
    company: 'Netflix',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    rating: 4.7,
    location: 'Los Angeles, CA',
    skills: ['Docker', 'Kubernetes', 'Jenkins'],
    isMentor: true,
    isConnected: false,
    requestSent: false,
    lastActive: '5 min ago',
    mentoringRate: '$180/hr',
    bio: 'DevOps expert helping teams build reliable deployment pipelines.'
  },
  {
    id: '5',
    name: 'Jordan Lee',
    role: 'Junior Developer',
    company: 'Startup Inc',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
    rating: 4.5,
    location: 'Austin, TX',
    skills: ['JavaScript', 'React', 'CSS'],
    isMentor: false,
    isConnected: false,
    requestSent: false,
    lastActive: '1 day ago',
    mentoringRate: null,
    bio: 'Aspiring developer looking to connect with fellow learners and mentors.'
  },
  {
    id: '6',
    name: 'Priya Patel',
    role: 'Mobile Developer',
    company: 'Uber',
    avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face',
    rating: 4.8,
    location: 'New York, NY',
    skills: ['React Native', 'Swift', 'Kotlin'],
    isMentor: true,
    isConnected: false,
    requestSent: false,
    lastActive: '3 hours ago',
    mentoringRate: '$160/hr',
    bio: 'Mobile development specialist with experience in cross-platform apps.'
  }
];

export default function ConnectionsPage() {
  const [users, setUsers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const handleConnect = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, requestSent: true }
        : user
    ));
    toast.success('Connection request sent successfully!');
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         user.role.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' || 
                         (selectedFilter === 'mentors' && user.isMentor) ||
                         (selectedFilter === 'students' && !user.isMentor) ||
                         (selectedFilter === 'connected' && user.isConnected);
    
    return matchesSearch && matchesFilter;
  });

  const UserCard = ({ user }: { user: any }) => (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/15 transition-all duration-300 group">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Avatar className="w-16 h-16 ring-2 ring-white/20">
                  <AvatarImage src={user.avatar} className="object-cover" />
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                    {user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                {user.lastActive.includes('min') && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
                )}
              </div>
              <div>
                <h3 className="text-white group-hover:text-blue-100 transition-colors">
                  {user.name}
                </h3>
                <p className="text-blue-200 text-sm">{user.role}</p>
                <p className="text-blue-300 text-xs">{user.company}</p>
              </div>
            </div>
            
            {user.isMentor && (
              <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0">
                Mentor
              </Badge>
            )}
          </div>

          <p className="text-blue-100 text-sm mb-4 line-clamp-2">{user.bio}</p>

          <div className="space-y-3 mb-4">
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center text-blue-200">
                <Star className="w-4 h-4 mr-1 text-yellow-400 fill-current" />
                {user.rating}
              </div>
              <div className="flex items-center text-blue-200">
                <MapPin className="w-4 h-4 mr-1" />
                {user.location}
              </div>
              {user.mentoringRate && (
                <div className="text-green-400">{user.mentoringRate}</div>
              )}
            </div>

            <div className="flex items-center text-blue-200 text-xs">
              <Calendar className="w-3 h-3 mr-1" />
              Active {user.lastActive}
            </div>

            <div className="flex flex-wrap gap-1">
              {user.skills.slice(0, 3).map((skill, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-white/10 border-white/20 text-blue-100 text-xs"
                >
                  {skill}
                </Badge>
              ))}
              {user.skills.length > 3 && (
                <Badge variant="secondary" className="bg-white/10 border-white/20 text-blue-100 text-xs">
                  +{user.skills.length - 3}
                </Badge>
              )}
            </div>
          </div>

          <div className="flex space-x-2">
            {user.isConnected ? (
              <>
                <Button
                  size="sm"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <MessageCircle className="w-4 h-4 mr-1" />
                  Chat
                </Button>
                <Button
                  size="sm"
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <Phone className="w-4 h-4" />
                </Button>
              </>
            ) : user.requestSent ? (
              <Button
                size="sm"
                disabled
                className="flex-1 bg-gray-600 text-gray-300 cursor-not-allowed"
              >
                <UserCheck className="w-4 h-4 mr-1" />
                Request Sent
              </Button>
            ) : (
              <Button
                size="sm"
                onClick={() => handleConnect(user.id)}
                className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white"
              >
                <UserPlus className="w-4 h-4 mr-1" />
                Connect
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className="min-h-screen pt-4 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl text-white mb-2">Connections</h1>
          <p className="text-blue-200">Discover and connect with mentors and fellow developers</p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300 w-5 h-5" />
              <Input
                placeholder="Search by name, skills, or role..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 bg-white/10 border-white/20 text-white placeholder:text-blue-300 focus:border-blue-400"
              />
            </div>
            
            <div className="flex items-center gap-3">
              <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                <SelectTrigger className="w-40 bg-white/10 border-white/20 text-white">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  <SelectItem value="all">All Users</SelectItem>
                  <SelectItem value="mentors">Mentors</SelectItem>
                  <SelectItem value="students">Students</SelectItem>
                  <SelectItem value="connected">Connected</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex bg-white/10 border border-white/20 rounded-lg p-1">
                <Button
                  size="sm"
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  onClick={() => setViewMode('grid')}
                  className="text-white"
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  onClick={() => setViewMode('list')}
                  className="text-white"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Results count */}
          <div className="mt-4 text-blue-200 text-sm">
            <Users className="w-4 h-4 inline mr-2" />
            {filteredUsers.length} users found
          </div>
        </motion.div>

        {/* Users Grid */}
        <motion.div
          className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {filteredUsers.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </motion.div>

        {/* Empty state */}
        {filteredUsers.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Users className="w-16 h-16 text-blue-300 mx-auto mb-4" />
            <h3 className="text-xl text-white mb-2">No users found</h3>
            <p className="text-blue-200 max-w-md mx-auto">
              Try adjusting your search terms or filters to find more users to connect with.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}