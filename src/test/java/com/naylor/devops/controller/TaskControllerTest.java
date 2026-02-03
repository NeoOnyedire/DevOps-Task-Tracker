package com.naylor.devops.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.naylor.devops.model.Task;
import com.naylor.devops.service.TaskService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.hamcrest.Matchers.hasSize;
import static org.mockito.ArgumentMatchers.any;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(TaskController.class)
class TaskControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private TaskService service;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void createTask_returns200() throws Exception {
        Task task = new Task();
        task.setTitle("Test Task");

        Mockito.when(service.createTask(any(Task.class))).thenReturn(task);

        mockMvc.perform(post("/api/tasks")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(task)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("Test Task"));
    }

    @Test
    void getAllTasks_returnsList() throws Exception {
        Mockito.when(service.getAllTasks()).thenReturn(List.of(new Task(), new Task()));

        mockMvc.perform(get("/api/tasks"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)));
    }

    @Test
    void updateStatus_returnsUpdatedTask() throws Exception {
        Task task = new Task();
        task.setStatus(Task.Status.DONE);

        Mockito.when(service.updateStatus(1L, Task.Status.DONE)).thenReturn(task);

        mockMvc.perform(put("/api/tasks/1/status/DONE"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("DONE"));
    }
}
