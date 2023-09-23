<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="stylenote.css">
    <script src="scriptnotepad.js" async></script>
    <title>Ruty - Bloc-note</title>
</head>
<body>
	<header id="header">
        <img src="logo.png" alt="Logo Ruty" id="menu-trigger">
        <h1 class="welcome">Ruty</h1>
    </header>
    <!-- Menu de navigation -->
    <div id="overlay"></div>
    <div id="menu" class="hidden">
        <nav class="nav">
            <li class="nav">
                <img src="home.png">
                <a href="home.php">Home</a>
            </li>
            <li class="nav">
                <img src="todo.png">
                <a>ToDo List</a>
            </li>
            <li class="nav">
                <img src="notepad.png">
                <a href="notepad.php">Bloc-Note</a>
            </li>
            <li class="nav">
                <img src="agenda.png">
                <a>Agenda</a>
            </li>
            <li class="nav">
                <img src="mails.png">
                <a>Boîte Mail</a>
            </li>
        </nav>
        <nav class="nav2">
            <li class="nav2">
                <img src="logout.png">
                <a href="index.php">Se déconnecter</a>
            </li>
        </nav>
    </div>
    <div id="app">
        <div id="sidebar">
            <div class="folders">
                <!-- Dossier actuel -->
                <p id="ActiveFolderInfo"></p>
                <!-- Bouton "Ajouter un dossier" -->
                <button id="add-folder">Ajouter un dossier</button>

                <!-- Liste des dossiers -->
                <ul id="folder-list">
                    <!-- Liste des dossiers ici -->

                </ul>
            </div>
            <div class="notes">
                <!-- Bouton "Ajouter une note" -->
                <button id="add-note">Ajouter une note</button>
                <!-- Bouton "Retour" pour quitter un dossier -->
                <button id="back-button">Retour</button>
                <ul id="note-list">
                    <!-- Liste des notes ici -->

                </ul>
            </div>
        </div>
        <div id="text-editor-container">          
            <!-- Ajoutez une zone de texte éditable pour le traitement de texte -->
            <div id="text-editor" contenteditable="true"></div>
        </div>
    </div>
</body>
</html>
