
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pencil, Save, CreditCard, ArrowLeft } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useCredits } from '@/context/CreditContext';
import { Card } from '@/components/ui/card';
import CreditPurchaseOptions from '@/components/CreditPurchaseOptions';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type ProfileFormValues = {
  name: string;
  email: string;
  password: string;
};

const Profile = () => {
  const navigate = useNavigate();
  const { credits } = useCredits();
  const [isEditing, setIsEditing] = useState(false);
  
  // Demo user data - in a real app, this would come from auth state or API
  const [userData, setUserData] = useState({
    name: 'User Name',
    email: 'user@example.com',
    avatar: '',
  });

  const form = useForm<ProfileFormValues>({
    defaultValues: {
      name: userData.name,
      email: userData.email,
      password: '',
    },
  });

  const onSubmit = (data: ProfileFormValues) => {
    // In a real app, this would call an API to update user data
    setUserData({
      ...userData,
      name: data.name,
      email: data.email,
    });
    
    toast.success('Profile updated successfully!');
    setIsEditing(false);
  };

  return (
    <div className="container max-w-4xl mx-auto pt-24 pb-16 px-4">
      <Button 
        variant="ghost" 
        className="mb-6 flex items-center gap-2"
        onClick={() => navigate('/')}
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Button>
      
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Left column - User info */}
        <div className="w-full md:w-2/3 space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Profile Settings</h1>
            <Button 
              variant={isEditing ? "default" : "outline"} 
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save
                </>
              ) : (
                <>
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit
                </>
              )}
            </Button>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <Avatar className="h-20 w-20">
              <AvatarImage src={userData.avatar} alt={userData.name} />
              <AvatarFallback className="text-lg">
                {userData.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-medium">{userData.name}</h2>
              <p className="text-muted-foreground">{userData.email}</p>
              <div className="mt-1 flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-primary" />
                <span className="font-medium text-primary">{credits} credits available</span>
              </div>
            </div>
          </div>

          {isEditing ? (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="your@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormDescription>
                        Leave blank to keep current password
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="mt-4">Save Changes</Button>
              </form>
            </Form>
          ) : (
            <Card className="p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Name</h3>
                  <p className="mt-1">{userData.name}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
                  <p className="mt-1">{userData.email}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Password</h3>
                  <p className="mt-1">••••••••</p>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Right column - Credits */}
        <div className="w-full md:w-1/3 mt-6 md:mt-0">
          <CreditPurchaseOptions />
        </div>
      </div>
    </div>
  );
};

export default Profile;
