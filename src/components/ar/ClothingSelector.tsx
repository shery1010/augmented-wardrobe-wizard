import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shirt, Crown, Watch, Glasses, Heart, ShoppingCart } from 'lucide-react';

// Import clothing images
import blueTshirt from '@/assets/clothing/blue-tshirt.jpg';
import whiteFormalShirt from '@/assets/clothing/white-formal-shirt.jpg';
import redPoloShirt from '@/assets/clothing/red-polo-shirt.jpg';
import grayHoodie from '@/assets/clothing/gray-hoodie.jpg';
import blackSunglasses from '@/assets/clothing/black-sunglasses.jpg';
import navyCap from '@/assets/clothing/navy-cap.jpg';
import silverWatch from '@/assets/clothing/silver-watch.jpg';
import goldNecklace from '@/assets/clothing/gold-necklace.jpg';

interface ClothingSelectorProps {
  onSelect: (clothingUrl: string) => void;
  selectedItem: string | null;
}

// Clothing items with real images
const clothingItems = {
  shirts: [
    { id: '1', name: 'Casual T-Shirt', url: blueTshirt, color: 'Ocean Blue', price: '$29', rating: 4.5, category: 'Casual' },
    { id: '2', name: 'Formal Shirt', url: whiteFormalShirt, color: 'Pure White', price: '$49', rating: 4.8, category: 'Formal' },
    { id: '3', name: 'Polo Shirt', url: redPoloShirt, color: 'Classic Red', price: '$39', rating: 4.3, category: 'Smart Casual' },
    { id: '4', name: 'Hoodie', url: grayHoodie, color: 'Stone Gray', price: '$59', rating: 4.7, category: 'Streetwear' },
  ],
  accessories: [
    { id: '5', name: 'Sunglasses', url: blackSunglasses, color: 'Jet Black', price: '$79', rating: 4.6, category: 'Eyewear' },
    { id: '6', name: 'Baseball Cap', url: navyCap, color: 'Navy Blue', price: '$25', rating: 4.2, category: 'Headwear' },
    { id: '7', name: 'Luxury Watch', url: silverWatch, color: 'Silver', price: '$199', rating: 4.9, category: 'Timepiece' },
    { id: '8', name: 'Chain Necklace', url: goldNecklace, color: 'Gold', price: '$89', rating: 4.4, category: 'Jewelry' },
  ]
};

export const ClothingSelector = ({ onSelect, selectedItem }: ClothingSelectorProps) => {
  const [activeTab, setActiveTab] = useState('shirts');

  const handleItemSelect = (url: string) => {
    onSelect(url);
  };

  const renderClothingGrid = (items: typeof clothingItems.shirts) => (
    <div className="grid grid-cols-1 gap-4">
      {items.map((item) => (
        <Card 
          key={item.id}
          className={`group cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02] ${
            selectedItem === item.url 
              ? 'ring-2 ring-primary shadow-lg bg-primary/5' 
              : 'hover:shadow-md'
          }`}
          onClick={() => handleItemSelect(item.url)}
        >
          <div className="p-4">
            <div className="relative">
              {/* Image Container */}
              <div className="aspect-[4/5] bg-gradient-to-br from-muted/30 to-muted/60 rounded-xl mb-3 overflow-hidden">
                <img 
                  src={item.url} 
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                
                {/* Overlay Icons */}
                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full p-1.5 hover:bg-white transition-colors">
                    <Heart className="w-3 h-3 text-muted-foreground hover:text-red-500 transition-colors" />
                  </div>
                  <div className="bg-white/90 backdrop-blur-sm rounded-full p-1.5 hover:bg-white transition-colors">
                    <ShoppingCart className="w-3 h-3 text-muted-foreground hover:text-primary transition-colors" />
                  </div>
                </div>

                {/* Selected Indicator */}
                {selectedItem === item.url && (
                  <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                    <div className="bg-primary text-primary-foreground rounded-full p-2">
                      <ShoppingCart className="w-4 h-4" />
                    </div>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold text-sm leading-tight">{item.name}</h4>
                    <p className="text-xs text-muted-foreground">{item.category}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-primary">{item.price}</div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <span>★</span>
                      <span>{item.rating}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs px-2 py-0.5">
                    {item.color}
                  </Badge>
                  <div className="text-xs text-muted-foreground">
                    Try On
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-1">Virtual Wardrobe</h3>
        <p className="text-xs text-muted-foreground">Select items to try on virtually</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 bg-muted/30">
          <TabsTrigger value="shirts" className="flex items-center gap-2 data-[state=active]:bg-background">
            <Shirt className="w-4 h-4" />
            <span className="font-medium">Clothing</span>
          </TabsTrigger>
          <TabsTrigger value="accessories" className="flex items-center gap-2 data-[state=active]:bg-background">
            <Crown className="w-4 h-4" />
            <span className="font-medium">Accessories</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="shirts" className="mt-6">
          <div className="max-h-[70vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-track-muted/30 scrollbar-thumb-muted-foreground/30">
            {renderClothingGrid(clothingItems.shirts)}
          </div>
        </TabsContent>
        
        <TabsContent value="accessories" className="mt-6">
          <div className="max-h-[70vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-track-muted/30 scrollbar-thumb-muted-foreground/30">
            {renderClothingGrid(clothingItems.accessories)}
          </div>
        </TabsContent>
      </Tabs>

      {/* Selection Status */}
      {selectedItem && (
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-primary/10 via-accent/5 to-secondary/10 p-4 border border-primary/20">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-50" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <p className="text-sm font-semibold text-primary">Ready for AR Try-On!</p>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Position yourself in front of the camera to see the virtual try-on effect in real-time.
            </p>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="space-y-2">
        {selectedItem && (
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => onSelect('')}
          >
            Clear Selection
          </Button>
        )}
        
        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            {clothingItems.shirts.length + clothingItems.accessories.length} items available
          </p>
        </div>
      </div>
    </div>
  );
};