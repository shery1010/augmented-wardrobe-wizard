import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shirt, Crown, Watch, Glasses } from 'lucide-react';

interface ClothingSelectorProps {
  onSelect: (clothingUrl: string) => void;
  selectedItem: string | null;
}

// Sample clothing items - In a real app, these would come from your clothing database
const clothingItems = {
  shirts: [
    { id: '1', name: 'Casual T-Shirt', url: '/api/placeholder/200/250', color: 'Blue', price: '$29' },
    { id: '2', name: 'Formal Shirt', url: '/api/placeholder/200/250', color: 'White', price: '$49' },
    { id: '3', name: 'Polo Shirt', url: '/api/placeholder/200/250', color: 'Red', price: '$39' },
    { id: '4', name: 'Hoodie', url: '/api/placeholder/200/250', color: 'Gray', price: '$59' },
  ],
  accessories: [
    { id: '5', name: 'Sunglasses', url: '/api/placeholder/150/100', color: 'Black', price: '$79' },
    { id: '6', name: 'Cap', url: '/api/placeholder/150/150', color: 'Navy', price: '$25' },
    { id: '7', name: 'Watch', url: '/api/placeholder/150/150', color: 'Silver', price: '$199' },
    { id: '8', name: 'Necklace', url: '/api/placeholder/150/150', color: 'Gold', price: '$89' },
  ]
};

export const ClothingSelector = ({ onSelect, selectedItem }: ClothingSelectorProps) => {
  const [activeTab, setActiveTab] = useState('shirts');

  const handleItemSelect = (url: string) => {
    onSelect(url);
  };

  const renderClothingGrid = (items: typeof clothingItems.shirts) => (
    <div className="grid grid-cols-2 gap-3">
      {items.map((item) => (
        <Card 
          key={item.id}
          className={`cursor-pointer transition-all hover:shadow-md ${
            selectedItem === item.url ? 'ring-2 ring-primary' : ''
          }`}
          onClick={() => handleItemSelect(item.url)}
        >
          <div className="p-3">
            <div className="aspect-square bg-muted rounded-lg mb-2 flex items-center justify-center">
              <img 
                src={item.url} 
                alt={item.name}
                className="w-full h-full object-cover rounded-lg"
                onError={(e) => {
                  // Fallback to placeholder with icon
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML = `
                      <div class="w-full h-full flex items-center justify-center text-muted-foreground">
                        ${activeTab === 'shirts' ? '<svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3 7h7l-5.5 4 2 7-6.5-5-6.5 5 2-7L2 9h7l3-7z"/></svg>' : '<svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>'}
                      </div>
                    `;
                  }
                }}
              />
            </div>
            <h4 className="font-medium text-sm truncate">{item.name}</h4>
            <div className="flex justify-between items-center mt-1">
              <Badge variant="secondary" className="text-xs">{item.color}</Badge>
              <span className="text-sm font-semibold text-primary">{item.price}</span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="shirts" className="flex items-center gap-2">
            <Shirt className="w-4 h-4" />
            Clothing
          </TabsTrigger>
          <TabsTrigger value="accessories" className="flex items-center gap-2">
            <Crown className="w-4 h-4" />
            Accessories
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="shirts" className="mt-4">
          {renderClothingGrid(clothingItems.shirts)}
        </TabsContent>
        
        <TabsContent value="accessories" className="mt-4">
          {renderClothingGrid(clothingItems.accessories)}
        </TabsContent>
      </Tabs>

      {selectedItem && (
        <div className="mt-4 p-3 bg-primary/10 rounded-lg">
          <p className="text-sm text-primary font-medium">Item Selected!</p>
          <p className="text-xs text-muted-foreground mt-1">
            Position yourself in front of the camera to see the virtual try-on effect.
          </p>
        </div>
      )}

      <Button 
        variant="outline" 
        className="w-full mt-4"
        onClick={() => onSelect('')}
      >
        Clear Selection
      </Button>
    </div>
  );
};