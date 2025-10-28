"use client";

import React, { useState } from "react";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

export interface CreateProjectModalProps {
  open: boolean;
  onClose: () => void;
}

const CREATE_PROJECT = gql`
  mutation CreateProject($data: CreateProjectInput!) {
    createProject(data: $data) {
      id
      name
      description
      related_person
      status
      time_spent
      time_remain
      tags
      created_at
      updated_at
    }
  }
`;

export function CreateProjectModal({ open, onClose }: CreateProjectModalProps) {
  const [name, setName] = useState("Default Project");
  const [description, setDescription] = useState("Default description");
  const [relatedPerson, setRelatedPerson] = useState("Default Person");
  const [status, setStatus] = useState("active");
  const [timeSpent, setTimeSpent] = useState<number | "">(10);
  const [timeRemain, setTimeRemain] = useState<number | "">(10);
  const [tags, setTags] = useState("frontend,urgent");

  const [createProject, { loading, error }] = useMutation(CREATE_PROJECT, {
    onCompleted: () => {
      setName("Default Project");
      setDescription("Default description");
      setRelatedPerson("Default Person");
      setStatus("active");
      setTimeSpent(10);
      setTimeRemain(10);
      setTags("frontend,urgent");
      onClose();
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log('___check___')
    e.preventDefault();
    const data: any = {
      name,
      description: description || null,
      related_person: relatedPerson,
      status,
      time_spent: timeSpent === "" ? 0 : Number(timeSpent),
      time_remain: timeRemain === "" ? 0 : Number(timeRemain),
      tags: tags || null,
    };
    try {
      await createProject({ variables: { data } });
    } catch (e) {
      // swallow here; error rendered below
      console.error(e);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) onClose(); }}>

      <DialogContent className="sm:max-w-3xl">
        <form onSubmit={handleSubmit}>

          {/* Header */}
          <DialogHeader>
            <DialogTitle>Create a Project</DialogTitle>
          </DialogHeader>

          {/* Body */}
          <div className="space-y-6 py-4">
            <div className="grid gap-4">
              <div className="grid gap-3">
                <label htmlFor="name" className="text-sm font-medium">Name</label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Office Party" />
              </div>

              <div className="grid gap-3">
                <label htmlFor="related_person" className="text-sm font-medium">Related person</label>
                <Input id="related_person" value={relatedPerson} onChange={(e) => setRelatedPerson(e.target.value)} placeholder="e.g. Nguyen Van A" />
              </div>

              <div className="grid gap-3">
                <label htmlFor="description" className="text-sm font-medium">Description</label>
                <Input id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Optional description" />
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="text-sm font-medium block">Status</label>
                  <select value={status} onChange={(e) => setStatus(e.target.value)} className="mt-1 w-full rounded-md border px-2 py-1 bg-slate-900 text-slate-100">
                    <option value="active">active</option>
                    <option value="paused">paused</option>
                    <option value="completed">completed</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium block">Time spent (h)</label>
                  <Input type="number" value={timeSpent} onChange={(e) => setTimeSpent(e.target.value === "" ? "" : Number(e.target.value))} />
                </div>

                <div>
                  <label className="text-sm font-medium block">Time remain (h)</label>
                  <Input type="number" value={timeRemain} onChange={(e) => setTimeRemain(e.target.value === "" ? "" : Number(e.target.value))} />
                </div>
              </div>

              <div className="grid gap-3">
                <label htmlFor="tags" className="text-sm font-medium">Tags (comma separated)</label>
                <Input id="tags" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="frontend,urgent" />
              </div>

              {/* Example checkboxes left in UI for options */}
              <div className="grid lg:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <Checkbox id="allow_timesheets" />
                  <div>
                    <label htmlFor="allow_timesheets" className="font-medium">Timesheets</label>
                    <p className="text-sm text-muted-foreground">Log time on tasks</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Checkbox id="allow_billable" />
                  <div>
                    <label htmlFor="allow_billable" className="font-medium">Billable</label>
                    <p className="text-sm text-muted-foreground">Invoice your time and material to customers</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <DialogFooter className="flex flex-wrap gap-2 justify-around md:justify-start">
            <Button variant="default" type="submit" >Create project</Button>
            <Button variant="secondary" type="button" onClick={onClose}>Discard</Button>
          </DialogFooter>

          {error && <div className="text-sm text-red-400 mt-2">Error: {(error as any).message}</div>}

        </form>

      </DialogContent>
    </Dialog>
  );
}
