<html>
    <head>
        <title>Ruty - ToDo List</title>
        <link rel="stylesheet" href="styles/styletodo.css">
        <link rel="icon" href="img/logo.png">        
    </head>
    <body>
        <header id="header">
            <img src="img/logo.png" alt="Logo Ruty" id="menu-trigger">
            <h1 class="welcome">Ruty</h1>
        </header>
        <div id="overlay"></div>
        <div id="menu" class="hidden">
            <nav class="nav">
                <li class="nav">
                    <img src="img/home.png">
                    <a href="home.php">Home</a>
                </li>
                <li class="nav">
                    <img src="img/todo.png">
                    <a href="#">ToDo List</a>
                </li>
                <li class="nav">
                    <img src="img/notepad.png">
                    <a href="notepad.php">Bloc-Note</a>
                </li>
                <li class="nav">
                    <img src="img/agenda.png">
                    <a>Agenda</a>
                </li>
                <li class="nav">
                    <img src="img/mails.png">
                    <a>Boîte Mail</a>
                </li>
            </nav>
            <nav class="nav2">
                <li class="nav2">
                    <img src="img/logout.png">
                    <a href="index.php">Se déconnecter</a>
                </li>
            </nav>
        </div>

		
		<script src="js/scripttodo.js"></script>
    </body>

</html>