import React from 'react';

const About = () => {
  return (
    <div className=" pt-28 pb-16 bg-black text-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-10 text-left">
          <h1 className="text-4xl font-playfair text-white">About <span className="text-4xl font-playfair text-gold">L'ESSENCE</span></h1>
        </div>
        
        <div className="grid md:grid-cols-2 gap-10 items-center mb-16">
          <div>
            <img 
              src="/src/assets/images/about-restaurant.jpg" 
              alt="L'ESSENCE Restaurant Interior"
              className="rounded-lg shadow-xl"
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80";
              }}
            />
          </div>
          <div>
            <h2 className="text-3xl font-playfair text-gold mb-4">Our Story</h2>
            <p className="mb-4 text-gray-300">
              Founded in 2018, L'ESSENCE was born from a passion to create extraordinary dining experiences that celebrate the essence of fine cuisine. Our restaurant brings together traditional techniques and contemporary innovation.
            </p>
            <p className="mb-4 text-gray-300">
              Located in the heart of the city, we've created an intimate space where guests can escape the ordinary and indulge in culinary artistry.
            </p>
          </div>
        </div>
        
        <div className="mb-16">
          <h2 className="text-3xl font-playfair text-gold mb-6 text-center">Our Philosophy</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-900 p-6 rounded-lg">
              <h3 className="text-xl font-playfair text-gold mb-3">Exceptional Ingredients</h3>
              <p className="text-gray-300">We source the finest seasonal ingredients, supporting local farmers and sustainable practices to ensure every dish reflects quality and care.</p>
            </div>
            <div className="bg-gray-900 p-6 rounded-lg">
              <h3 className="text-xl font-playfair text-gold mb-3">Culinary Artistry</h3>
              <p className="text-gray-300">Our skilled chefs transform ingredients into edible art, balancing flavors, textures, and presentation to create memorable dining experiences.</p>
            </div>
            <div className="bg-gray-900 p-6 rounded-lg">
              <h3 className="text-xl font-playfair text-gold mb-3">Hospitality</h3>
              <p className="text-gray-300">We believe dining is about more than food—it's about creating moments. Our service is attentive yet unobtrusive, ensuring your comfort.</p>
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="text-3xl font-playfair text-gold mb-6 text-center">Meet Our Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-40 h-40 rounded-full overflow-hidden mx-auto mb-4">
                <img 
                  src="/src/assets/images/chef.jpg" 
                  alt="Executive Chef"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1583394293214-28ded15ee548?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80";
                  }}
                />
              </div>
              <h3 className="text-xl font-playfair text-gold">Michel Laurent</h3>
              <p className="text-gray-400">Executive Chef</p>
            </div>
            <div className="text-center">
              <div className="w-40 h-40 rounded-full overflow-hidden mx-auto mb-4">
                <img 
                  src="/src/assets/images/sommelier.jpg" 
                  alt="Head Sommelier"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1577301656525-dced3dbdbd8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80";
                  }}
                />
              </div>
              <h3 className="text-xl font-playfair text-gold">Isabella Romano</h3>
              <p className="text-gray-400">Head Sommelier</p>
            </div>
            <div className="text-center">
              <div className="w-40 h-40 rounded-full overflow-hidden mx-auto mb-4">
                <img 
                  src="/src/assets/images/manager.jpg" 
                  alt="Restaurant Manager"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1361&q=80";
                  }}
                />
              </div>
              <h3 className="text-xl font-playfair text-gold">Alexander Chen</h3>
              <p className="text-gray-400">Restaurant Manager</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
