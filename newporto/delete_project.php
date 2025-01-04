<?php
// delete_project.php

// Include database connection
include 'db.php';

// Check if the ID is set in the URL
if (isset($_GET['id'])) {
    $id = $_GET['id'];

    // Delete the project from the database
    $sql = "DELETE FROM projects WHERE id = $id";
    if (mysqli_query($conn, $sql)) {
        echo "Project deleted successfully.";
    } else {
        echo "Error: " . mysqli_error($conn);
    }

    // Redirect back to manage_projects.php
    header("Location: manage_projects.php");
    exit();
} else {
    echo "No project ID specified.";
}
?>
