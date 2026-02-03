package com.naylor.devops.controller;

import com.naylor.devops.model.Task;
import com.naylor.devops.service.TaskService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "*")
public class TaskController {

    private final TaskService service;

    public TaskController(TaskService service) {
        this.service = service;
    }

    @PostMapping
    public Task create(@RequestBody Task task) {
        return service.createTask(task);
    }

    @GetMapping
    public List<Task> getAll() {
        return service.getAllTasks();
    }

    @GetMapping("/status/{status}")
    public List<Task> getByStatus(@PathVariable Task.Status status) {
        return service.getByStatus(status);
    }

    @PutMapping("/{id}/status/{status}")
    public Task updateStatus(@PathVariable Long id, @PathVariable Task.Status status) {
        return service.updateStatus(id, status);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.deleteTask(id);
    }
}
