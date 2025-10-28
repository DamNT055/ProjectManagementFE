import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

export interface CreateProjectModalProps {
  open: boolean;
  onClose: () => void;
}

export function CreateProjectModal({ open, onClose }: CreateProjectModalProps) {
  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) onClose(); }}>
      <DialogContent className="sm:max-w-3xl">
        {/* Header */}
        <DialogHeader>
          <DialogTitle>Create a Project</DialogTitle>
        </DialogHeader>

        {/* Body */}
        <div className="space-y-6 py-4">
          {/* Project Name */}
          <div className="flex flex-col">
            <label htmlFor="name" className="text-sm font-medium text-gray-700">
              Name
            </label>
            <Input
              id="name"
              placeholder="e.g. Office Party"
              className="mt-1"
            />
          </div>

          {/* Checkboxes */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <Checkbox id="allow_timesheets" />
              <div>
                <label htmlFor="allow_timesheets" className="font-medium">
                  Timesheets
                </label>
                <p className="text-sm text-muted-foreground">Log time on tasks</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Checkbox id="allow_billable" />
              <div>
                <label htmlFor="allow_billable" className="font-medium">
                  Billable
                </label>
                <p className="text-sm text-muted-foreground">
                  Invoice your time and material to customers
                </p>
              </div>
            </div>
          </div>

          {/* Create tasks by email */}
          <div className="flex flex-col space-y-2">
            <label htmlFor="alias_name" className="text-sm font-medium">
              Create tasks by email
              <sup className="text-info ml-1 cursor-help">?</sup>
            </label>
            <div className="flex space-x-2">
              <Input
                id="alias_name"
                placeholder="e.g. office-party"
              />
              <span className="flex items-center">@</span>
              <Input
                id="alias_domain"
                placeholder="e.g. mycompany.com"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <DialogFooter className="flex flex-wrap gap-2 justify-around md:justify-start">
          <Button variant="default" onClick={onClose}>Create project</Button>
          <Button variant="secondary" onClick={onClose}>Discard</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
