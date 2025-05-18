import { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";

function Tasks({ tasks, setTaskClicked, setTaskForm, taskStatuses, people }) {
    const [statusFilter, setStatusFilter] = useState("");
    const [delegateFilter, setDelegateFilter] = useState("");
    const [sortField, setSortField] = useState(""); // Track which field to sort by
    const [sortDirection, setSortDirection] = useState("asc"); // Track sort direction (asc/desc)
    const [sortedTasks, setSortedTasks] = useState([]);

    function handleTaskClicked(taskId) {
        setTaskClicked(taskId);
    };

    function handleOpenForm() {
        setTaskForm(true);
    };

    // Handle sorting when a sortable header is clicked
    function handleSort(field) {
        // If clicking the same field, toggle direction
        if (sortField === field) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            // If clicking a new field, set it as sort field and default to ascending
            setSortField(field);
            setSortDirection("asc");
        }
    };

    // Function to parse dd/mm/yyyy dates
    function parseDate(dateStr) {
        if (!dateStr) return null;

        // Check if it matches dd/mm/yyyy format
        const parts = dateStr.split('/');
        if (parts.length === 3) {
            // Convert from dd/mm/yyyy to a proper date object
            const day = parseInt(parts[0], 10);
            const month = parseInt(parts[1], 10) - 1; // JavaScript months are 0-based
            const year = parseInt(parts[2], 10);

            return new Date(year, month, day);
        }

        // If not in dd/mm/yyyy format, try standard parsing
        return new Date(dateStr);
    }

    // Apply filtering and sorting whenever relevant state changes
    useEffect(() => {
        // First, apply filters
        let filtered = tasks.filter(task => {
            const matchesStatus = statusFilter === "" || task.status === statusFilter;
            const matchesDelegate = delegateFilter === "" || task.owner === delegateFilter;
            return matchesStatus && matchesDelegate;
        });

        // Then, apply sorting if needed
        if (sortField) {
            filtered = [...filtered].sort((a, b) => {
                // Handle date sorting for our three sortable fields
                if (['date_created', 'date_due', 'status_date'].includes(sortField)) {
                    // Check if the values exist
                    const valueA = a[sortField];
                    const valueB = b[sortField];

                    // If either value is missing, handle accordingly
                    if (!valueA && !valueB) return 0;
                    if (!valueA) return sortDirection === "asc" ? 1 : -1;
                    if (!valueB) return sortDirection === "asc" ? -1 : 1;

                    // Parse dates with our custom parsing function
                    const dateA = parseDate(valueA);
                    const dateB = parseDate(valueB);

                    // If parsing fails, handle accordingly
                    if (!dateA && !dateB) return 0;
                    if (!dateA) return sortDirection === "asc" ? 1 : -1;
                    if (!dateB) return sortDirection === "asc" ? -1 : 1;

                    // Compare dates
                    return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
                }

                return 0; // Default return if field isn't sortable
            });
        }

        // Update the state with our filtered and sorted tasks
        setSortedTasks(filtered);
    }, [tasks, statusFilter, delegateFilter, sortField, sortDirection]);

    // Reset all filters and sorting
    function handleResetFilters() {
        setStatusFilter("");
        setDelegateFilter("");
        setSortField("");
        setSortDirection("asc");
    }

    if (tasks.length > 0)
        return (
            <div className="tasks-container">
                <h2>All Tasks (select task to view/update notes)</h2>

                {/* Filter controls */}
                <div className="filter-controls">
                    <div className="filter-item">
                        <label className="filter-text" htmlFor="status-filter">Filter by Status: </label>
                        <select
                            id="status-filter"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="">All</option>
                            {taskStatuses.map((status, index) => (
                                <option key={index} value={status}>{status}</option>
                            ))}
                        </select>
                    </div>

                    <div className="filter-item">
                        <label className="filter-text" htmlFor="delegate-filter">Filter by Delegate: </label>
                        <select
                            id="delegate-filter"
                            value={delegateFilter}
                            onChange={(e) => setDelegateFilter(e.target.value)}
                        >
                            <option value="">All</option>
                            {people.map((person) => (
                                <option key={person.id} value={person.name}>{person.name}</option>
                            ))}
                        </select>
                    </div>

                    <button onClick={handleResetFilters} className="small-button" id="reset-filters">
                        {sortField ? "Reset Filters & Sorting" : "Reset Filters"}
                    </button>
                </div>

                <table className="task-table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Details</th>
                            <th>
                                Date created
                                <button
                                    onClick={() => handleSort("date_created")}
                                    className="sort-button"
                                    title={sortField === "date_created" ? `Sorted ${sortDirection}` : "Sort by date created"}
                                >
                                    {sortField === "date_created" ? (sortDirection === "asc" ? "↑" : "↓") : "↕"}
                                </button>
                            </th>
                            <th>
                                Date due
                                <button
                                    onClick={() => handleSort("date_due")}
                                    className="sort-button"
                                    title={sortField === "date_due" ? `Sorted ${sortDirection}` : "Sort by date due"}
                                >
                                    {sortField === "date_due" ? (sortDirection === "asc" ? "↑" : "↓") : "↕"}
                                </button>
                            </th>
                            <th>Status</th>
                            <th>
                                Status date
                                <button
                                    onClick={() => handleSort("status_date")}
                                    className="sort-button"
                                    title={sortField === "status_date" ? `Sorted ${sortDirection}` : "Sort by status date"}
                                >
                                    {sortField === "status_date" ? (sortDirection === "asc" ? "↑" : "↓") : "↕"}
                                </button>
                            </th>
                            <th>Delegate</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedTasks.map((task, index) => (
                            <tr key={index} onClick={() => handleTaskClicked(task.id)}>
                                <td className="task-title2">{task.title}</td>
                                <td className="task-details">{task.details}</td>
                                <td>{task.date_created}</td>
                                <td>{task.date_due}</td>
                                <td>{task.status}</td>
                                <td>{task.status_date}</td>
                                <td className={!task.owner || task.owner === "Unassigned" ? "vacant-selected" : ""}>{task.owner ? task.owner : "Unassigned"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {sortedTasks.length === 0 && (
                    <p>No tasks match the selected filters.</p>
                )}
                <button onClick={handleOpenForm} className="small-button">Add new task</button>
            </div>
        );
    else
        return (
            <div>
                <h2>All Tasks (select task to view/update notes)</h2>
                <h3>There are no tasks in the system. Click button below to add a task.</h3>
                <button onClick={handleOpenForm} className="small-button">Add new task</button>
            </div>
        )
}

export default Tasks