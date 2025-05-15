
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Users, ChefHat, Utensils } from "lucide-react";

const Dashboard = () => {
  // Mock data - would be fetched from API
  const stats = [
    { id: 1, title: "Total Orders", value: "124", icon: Package, change: "+12% from last week" },
    { id: 2, title: "Staff Members", value: "8", icon: Users, change: "No change" },
    { id: 3, title: "Menu Items", value: "36", icon: ChefHat, change: "+3 new items" },
    { id: 4, title: "Pending Orders", value: "5", icon: Utensils, change: "2 ready for service" },
  ];
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your restaurant operations</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.id}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest orders received</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Order data would be displayed here</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Popular Items</CardTitle>
            <CardDescription>Most ordered items this week</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Popular items data would be displayed here</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
