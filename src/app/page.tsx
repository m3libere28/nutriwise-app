'use client';

import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { MobileNav } from './components/MobileNav';
import { ClientList } from './components/ClientList';
import { ClientDetails } from './components/ClientDetails';
import { MealPlanner } from './components/MealPlanner';
import { MealPlanTemplates } from './components/MealPlanTemplates';
import { GroceryList } from './components/GroceryList';
import { Messaging } from './components/Messaging';
import { Client, MealTemplate } from './types';
import { Dashboard } from './components/Dashboard';

export default function Home() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<MealTemplate | null>(null);

  const handleTemplateSelect = (template: MealTemplate) => {
    setSelectedTemplate(template);
    // Here you would typically apply the template to the meal planner
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="hidden md:block w-64 h-screen sticky top-0">
          <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        {/* Main Content */}
        <main className="flex-1 px-4 py-8">
          <div className="max-w-6xl mx-auto space-y-8">
            {activeTab === 'dashboard' && <Dashboard />}
            {activeTab === 'clients' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                  <ClientList onSelectClient={setSelectedClient} />
                </div>
                <div className="lg:col-span-2">
                  {selectedClient ? (
                    <ClientDetails client={selectedClient} />
                  ) : (
                    <div className="h-full flex items-center justify-center text-gray-500">
                      Select a client to view details
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'meal-planner' && (
              <div className="space-y-8">
                <MealPlanTemplates
                  onSelectTemplate={handleTemplateSelect}
                  clientGoals={selectedClient?.goals}
                />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <MealPlanner template={selectedTemplate} />
                  </div>
                  <div className="lg:col-span-1">
                    <GroceryList />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'messages' && <Messaging />}
          </div>
        </main>
      </div>

      {/* Mobile Navigation */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white border-t">
        <MobileNav activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </div>
  );
}
