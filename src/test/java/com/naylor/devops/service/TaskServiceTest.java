package com.naylor.devops.service;

import com.naylor.devops.model.Task;
import com.naylor.devops.repository.TaskRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;

class TaskServiceTest {

    private TaskRepository repository;
    private TaskService service;

    @BeforeEach
    void setup() {
        repository = Mockito.mock(TaskRepository.class);
        service = new TaskService(repository);
    }

    @Test
    void createTask_setsStatusToTodo() {
        Task task = new Task();
        task.setTitle("Deploy API");

        Mockito.when(repository.save(any(Task.class))).thenAnswer(i -> i.getArgument(0));

        Task result = service.createTask(task);

        assertEquals(Task.Status.TODO, result.getStatus());
        Mockito.verify(repository).save(any(Task.class));
    }

    @Test
    void getAllTasks_returnsList() {
        Mockito.when(repository.findAll()).thenReturn(List.of(new Task(), new Task()));

        List<Task> result = service.getAllTasks();

        assertEquals(2, result.size());
        Mockito.verify(repository).findAll();
    }

    @Test
    void updateStatus_updatesCorrectly() {
        Task task = new Task();
        task.setId(1L);
        task.setStatus(Task.Status.TODO);

        Mockito.when(repository.findById(1L)).thenReturn(Optional.of(task));
        Mockito.when(repository.save(any(Task.class))).thenAnswer(i -> i.getArgument(0));

        Task updated = service.updateStatus(1L, Task.Status.DONE);

        assertEquals(Task.Status.DONE, updated.getStatus());
    }

    @Test
    void updateStatus_throwsIfNotFound() {
        Mockito.when(repository.findById(eq(99L))).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> service.updateStatus(99L, Task.Status.DONE));
    }
}
