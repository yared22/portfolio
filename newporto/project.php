<?php
// project.php

// Include database connection
include 'db.php';

// Fetch existing projects
$result = mysqli_query($conn, "SELECT * FROM projects");
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Project Display</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
<h1>Projects</h1>

<h2>Existing Projects</h2>
<table>
    <tr>
        <th>Title</th>
        <th>Description</th>
        <th>Actions</th>
    </tr>
    <?php while ($row = mysqli_fetch_assoc($result)) { ?>
    <tr>
        <td><?php echo $row['title']; ?></td>
        <td><?php echo $row['description']; ?></td>
        <td>
            <a href="edit_project.php?id=<?php echo $row['id']; ?>">Edit</a>
            <a href="delete_project.php?id=<?php echo $row['id']; ?>">Delete</a>
        </td>
    </tr>
    <?php } ?>
</table>
<a href="index.php">back to home</a>
</body>
</html>
