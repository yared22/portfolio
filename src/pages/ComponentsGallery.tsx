import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { Check, Info, AlertTriangle, X, Calendar as CalendarIcon, ChevronRight, Plus } from "lucide-react";

const ComponentsGallery = () => {
  const [sliderValue, setSliderValue] = useState([50]);
  const [switchState, setSwitchState] = useState(false);
  const [checkboxState, setCheckboxState] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [toggleState, setToggleState] = useState("single");

  return (
    <div className="min-h-screen bg-background">
      <Toaster />
      <div className="container mx-auto py-12 px-4">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Components Gallery</h1>
          <p className="text-muted-foreground text-lg">All UI components from the components/ui folder</p>
        </div>

        <div className="grid gap-8">
          {/* Buttons */}
          <Card>
            <CardHeader>
              <CardTitle>Buttons</CardTitle>
              <CardDescription>Different button variants and sizes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Button>Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
              </div>
              <div className="flex flex-wrap gap-2 items-center">
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
                <Button size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Badges */}
          <Card>
            <CardHeader>
              <CardTitle>Badges</CardTitle>
              <CardDescription>Badge variants</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="destructive">Destructive</Badge>
                <Badge variant="outline">Outline</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Inputs */}
          <Card>
            <CardHeader>
              <CardTitle>Inputs</CardTitle>
              <CardDescription>Text input and textarea</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="input">Input</Label>
                <Input id="input" placeholder="Enter text..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="textarea">Textarea</Label>
                <Textarea id="textarea" placeholder="Enter multiple lines..." />
              </div>
            </CardContent>
          </Card>

          {/* Switch & Checkbox */}
          <Card>
            <CardHeader>
              <CardTitle>Switch & Checkbox</CardTitle>
              <CardDescription>Toggle and selection components</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch id="switch" checked={switchState} onCheckedChange={setSwitchState} />
                <Label htmlFor="switch">Switch</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="checkbox" checked={checkboxState} onCheckedChange={setCheckboxState} />
                <Label htmlFor="checkbox">Checkbox</Label>
              </div>
            </CardContent>
          </Card>

          {/* Slider & Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Slider & Progress</CardTitle>
              <CardDescription>Range and progress indicators</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Slider</Label>
                <Slider value={sliderValue} onValueChange={setSliderValue} max={100} step={1} />
              </div>
              <div className="space-y-2">
                <Label>Progress</Label>
                <Progress value={66} />
              </div>
            </CardContent>
          </Card>

          {/* Avatar */}
          <Card>
            <CardHeader>
              <CardTitle>Avatar</CardTitle>
              <CardDescription>User avatar component</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </div>
            </CardContent>
          </Card>

          {/* Tabs */}
          <Card>
            <CardHeader>
              <CardTitle>Tabs</CardTitle>
              <CardDescription>Tabbed content navigation</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="tab1">
                <TabsList>
                  <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                  <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                  <TabsTrigger value="tab3">Tab 3</TabsTrigger>
                </TabsList>
                <TabsContent value="tab1" className="mt-4">
                  Content for Tab 1
                </TabsContent>
                <TabsContent value="tab2" className="mt-4">
                  Content for Tab 2
                </TabsContent>
                <TabsContent value="tab3" className="mt-4">
                  Content for Tab 3
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Alerts */}
          <Card>
            <CardHeader>
              <CardTitle>Alerts</CardTitle>
              <CardDescription>Alert notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Default Alert</AlertTitle>
                <AlertDescription>This is a default alert message.</AlertDescription>
              </Alert>
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Destructive Alert</AlertTitle>
                <AlertDescription>This is a destructive alert message.</AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Dialog */}
          <Card>
            <CardHeader>
              <CardTitle>Dialog</CardTitle>
              <CardDescription>Modal dialog component</CardDescription>
            </CardHeader>
            <CardContent>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Open Dialog</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Dialog Title</DialogTitle>
                    <DialogDescription>
                      This is a dialog description. You can put any content here.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4">
                    Dialog content goes here.
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>

          {/* Select */}
          <Card>
            <CardHeader>
              <CardTitle>Select</CardTitle>
              <CardDescription>Dropdown selection component</CardDescription>
            </CardHeader>
            <CardContent>
              <Select>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="option1">Option 1</SelectItem>
                  <SelectItem value="option2">Option 2</SelectItem>
                  <SelectItem value="option3">Option 3</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Radio Group */}
          <Card>
            <CardHeader>
              <CardTitle>Radio Group</CardTitle>
              <CardDescription>Single selection radio buttons</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup defaultValue="option1">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option1" id="r1" />
                  <Label htmlFor="r1">Option 1</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option2" id="r2" />
                  <Label htmlFor="r2">Option 2</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option3" id="r3" />
                  <Label htmlFor="r3">Option 3</Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Accordion */}
          <Card>
            <CardHeader>
              <CardTitle>Accordion</CardTitle>
              <CardDescription>Collapsible content sections</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible>
                <AccordionItem value="item1">
                  <AccordionTrigger>Is it accessible?</AccordionTrigger>
                  <AccordionContent>
                    Yes. It adheres to the WAI-ARIA design pattern.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item2">
                  <AccordionTrigger>Is it styled?</AccordionTrigger>
                  <AccordionContent>
                    Yes. It comes with default styles that match the other components.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item3">
                  <AccordionTrigger>Is it animated?</AccordionTrigger>
                  <AccordionContent>
                    Yes. It's animated by default, but you can disable it if you prefer.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          {/* Separator */}
          <Card>
            <CardHeader>
              <CardTitle>Separator</CardTitle>
              <CardDescription>Visual divider</CardDescription>
            </CardHeader>
            <CardContent>
              <div>
                <p>Content above</p>
                <Separator className="my-4" />
                <p>Content below</p>
              </div>
            </CardContent>
          </Card>

          {/* Skeleton */}
          <Card>
            <CardHeader>
              <CardTitle>Skeleton</CardTitle>
              <CardDescription>Loading placeholder</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Toggle */}
          <Card>
            <CardHeader>
              <CardTitle>Toggle</CardTitle>
              <CardDescription>Toggle button component</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Toggle>Toggle</Toggle>
                <Toggle variant="outline">Outline</Toggle>
              </div>
            </CardContent>
          </Card>

          {/* Toggle Group */}
          <Card>
            <CardHeader>
              <CardTitle>Toggle Group</CardTitle>
              <CardDescription>Group of toggle buttons</CardDescription>
            </CardHeader>
            <CardContent>
              <ToggleGroup type="single" value={toggleState} onValueChange={setToggleState}>
                <ToggleGroupItem value="single">Single</ToggleGroupItem>
                <ToggleGroupItem value="multiple">Multiple</ToggleGroupItem>
              </ToggleGroup>
            </CardContent>
          </Card>

          {/* Scroll Area */}
          <Card>
            <CardHeader>
              <CardTitle>Scroll Area</CardTitle>
              <CardDescription>Custom scrollable area</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
                <div className="space-y-4">
                  <p>This is a scrollable area with custom styling.</p>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                  <p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                  <p>Ut enim ad minim veniam, quis nostrud exercitation.</p>
                  <p>Ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                  <p>Duis aute irure dolor in reprehenderit in voluptate.</p>
                  <p>Excepteur sint occaecat cupidatat non proident.</p>
                  <p>Sunt in culpa qui officia deserunt mollit anim.</p>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Tooltip */}
          <Card>
            <CardHeader>
              <CardTitle>Tooltip</CardTitle>
              <CardDescription>Hover tooltip component</CardDescription>
            </CardHeader>
            <CardContent>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline">Hover me</Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>This is a tooltip</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardContent>
          </Card>

          {/* Hover Card */}
          <Card>
            <CardHeader>
              <CardTitle>Hover Card</CardTitle>
              <CardDescription>Card that appears on hover</CardDescription>
            </CardHeader>
            <CardContent>
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button variant="outline">Hover for more info</Button>
                </HoverCardTrigger>
                <HoverCardContent>
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold">Hover Card</h4>
                    <p className="text-sm text-muted-foreground">
                      This content appears when you hover over the trigger.
                    </p>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </CardContent>
          </Card>

          {/* Popover */}
          <Card>
            <CardHeader>
              <CardTitle>Popover</CardTitle>
              <CardDescription>Popover content component</CardDescription>
            </CardHeader>
            <CardContent>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">Open Popover</Button>
                </PopoverTrigger>
                <PopoverContent>
                  <div className="space-y-2">
                    <h4 className="font-semibold">Popover Title</h4>
                    <p className="text-sm text-muted-foreground">
                      This is popover content that appears when triggered.
                    </p>
                  </div>
                </PopoverContent>
              </Popover>
            </CardContent>
          </Card>

          {/* Breadcrumb */}
          <Card>
            <CardHeader>
              <CardTitle>Breadcrumb</CardTitle>
              <CardDescription>Navigation breadcrumb</CardDescription>
            </CardHeader>
            <CardContent>
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator>
                    <ChevronRight className="h-4 w-4" />
                  </BreadcrumbSeparator>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/components">Components</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator>
                    <ChevronRight className="h-4 w-4" />
                  </BreadcrumbSeparator>
                  <BreadcrumbItem>
                    <BreadcrumbPage>Gallery</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </CardContent>
          </Card>

          {/* Table */}
          <Card>
            <CardHeader>
              <CardTitle>Table</CardTitle>
              <CardDescription>Data table component</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Role</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>John Doe</TableCell>
                    <TableCell><Badge>Active</Badge></TableCell>
                    <TableCell>Admin</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Jane Smith</TableCell>
                    <TableCell><Badge variant="secondary">Inactive</Badge></TableCell>
                    <TableCell>User</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Bob Johnson</TableCell>
                    <TableCell><Badge variant="outline">Pending</Badge></TableCell>
                    <TableCell>User</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Calendar */}
          <Card>
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
              <CardDescription>Date picker calendar</CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>

          {/* Toast */}
          <Card>
            <CardHeader>
              <CardTitle>Toast</CardTitle>
              <CardDescription>Toast notification</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => toast({
                  title: "Success!",
                  description: "This is a toast notification.",
                })}
              >
                Show Toast
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ComponentsGallery;
