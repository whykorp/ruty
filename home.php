<html>
    <head>
        <meta charset="UTF-8">
        <title>Ruty - L'outil multifonction</title>
        <link rel="stylesheet" href="styles/style1.css">
        <link rel="icon" href="img/logo.png">        
    </head>
    <body>
        <header id="header">
            <img src="img/logo.png" alt="Logo Ruty" id="menu-trigger">
            <h1 class="name">Ruty</h1>
        </header>
        <div id="overlay"></div>
        <div id="menu" class="hidden">
            <nav class="nav">
                <li class="nav">
                    <img src="img/home.png">
                    <a href="#">Home</a>
                </li>
                <li class="nav">
                    <img src="img/todo.png">
                    <a href="todo.php">ToDo List</a>
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
                    <a href="index.html">Se déconnecter</a>
                </li>
            </nav>
        </div>
        <div>
            <h2 class="welcome">Bienvenue dans votre espace Noah !</h2>
            <div id="current_date">
                <p id="p1"></p>
                <script>
                    let date1 = new Date();

                    let dateLocale = date1.toLocaleString('fr-FR',{
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                        });

                    document.getElementById('p1').innerHTML = 'Nous sommes le ' + dateLocale;
                </script>
            </div>
        </div>

        <script src="js/script.js" async></script>
    </body>

</html>