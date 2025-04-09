import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { db } from '@/config/firebase-config';

export function Contact() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Add to Firestore
      await addDoc(collection(db, 'contacts'), {
        ...formData,
        createdAt: new Date().toISOString()
      });
      
      setSubmitSuccess(true);
      setFormData({
        username: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="section-contact py-12">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-4">Contact Us</h2>
        <p className="text-lg text-center text-muted-foreground mb-8">
          Get in touch with us. We are always here to help you.
        </p>
      </div>

      <div className="container grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="contact-content">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="username">Full Name</Label>
                <Input
                  type="text"
                  name="username"
                  id="username"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter full name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="abc@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                type="text"
                name="subject"
                id="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                placeholder="Title of your message"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                name="message"
                id="message"
                required
                value={formData.message}
                onChange={handleChange}
                rows={6}
                placeholder="We are always here to help you."
              />
            </div>

            <div className="pt-2">
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full md:w-auto"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </div>

            {submitSuccess && (
              <div className="p-4 bg-green-100 text-green-800 rounded-md">
                Thank you for your message! We'll get back to you soon.
              </div>
            )}
          </form>
        </div>
        <div className="contact-map h-full min-h-[400px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.2613173278896!2d73.91411937501422!3d18.562253982539413!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c147b8b3a3bf%3A0x6f7fdcc8e4d6c77e!2sPhoenix%20Marketcity%20Pune!5e0!3m2!1sen!2sin!4v1696124215167!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
}