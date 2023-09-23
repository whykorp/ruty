// Ouverture menu nav
const menuTrigger = document.getElementById("menu-trigger");
const menu = document.getElementById("menu");
const overlay = document.getElementById("overlay")

menuTrigger.addEventListener("click", () => {
    menu.classList.toggle("hidden");
    if (!menu.classList.contains("hidden")) {
        menu.classList.remove("hidden");
        menu.style.left = "-300px";
        overlay.style.display = "none";
    } else {
        menu.classList.add("hidden");
        menu.style.left = "0px";
        overlay.style.display = "block";
    }
});


// Notepad
ActiveFolder = "Menu principal";
/*let ActiveFolder = e.target.textContent;*/
const folderList = document.getElementById("folder-list");
const noteList = document.getElementById("note-list");
const textEditor = document.getElementById("text-editor");
const backButton = document.getElementById("back-button");
const textEditorContainer = document.getElementById("text-editor-container");

// Exemple de données de dossiers et de notes (vous pouvez les remplacer par des données réelles)
const data = [
    {
        folder: "Dossier 1",
        notes: ["Note 1", "Note 2"]
    },
    {
        folder: "Dossier 2",
        notes: ["Note 3", "Note 4"]
    }
];

// Fonction pour afficher les dossiers
function displayFolders() {
    folderList.innerHTML = ""; // Efface la liste des dossiers actuels

    data.forEach((item) => {
        const folderItem = document.createElement("li");
        folderItem.textContent = item.folder;
        folderItem.classList.add("folder");
        folderList.appendChild(folderItem);
        RefreshActiveFolder("Menu principal");
    });
}

// Fonction pour afficher les notes d'un dossier donné
function displayNotes(folderName) {
    noteList.innerHTML = ""; // Efface la liste des notes actuelles

    const folder = data.find((item) => item.folder === folderName);

    if (folder && folder.notes) {
        folder.notes.forEach((note) => {
            const noteItem = document.createElement("li");
            noteItem.textContent = note;
            noteList.appendChild(noteItem);
        });
    }
}

// Afficher les dossiers au chargement de la page
displayFolders();

// Informe sur le dossier actuellement ouvert
function RefreshActiveFolder(folderName){
    let ActiveFolder = folderName;
    document.getElementById("ActiveFolderInfo").innerHTML = ActiveFolder;
}

// Gérer le clic sur les dossiers
folderList.addEventListener("click", (e) => {
    if (e.target.classList.contains("folder")) {
        const folderName = e.target.textContent;
        displayNotes(folderName);
        RefreshActiveFolder(folderName);
    }
});


// Récupérer les éléments boutons
const addFolderButton = document.getElementById("add-folder");
const addNoteButton = document.getElementById("add-note");

// Fonction d'ajout de dossier
function AddFolder(){
    const folderName = prompt("Entrez le nom du dossier")
    data.push({ folder: folderName, notes: [] });
    displayFolders();
}

// Bouton d'ajout de dossier
addFolderButton.addEventListener("click", () => {
    AddFolder();
});

// Gérez l'affichage initial de la page
function showInitialView() {
    folderList.style.display = "block";
    noteList.style.display = "none";
    backButton.style.display = "none";
    addNoteButton.style.display ="none";
    textEditorContainer.style.display = "none"; // Masquez le conteneur du traitement de texte
}

// Gérez l'affichage des notes dans un dossier
function showNotesInFolder(folderName) {
    folderList.style.display = "none";
    noteList.style.display = "block";
    backButton.style.display = "block";
    addNoteButton.style.display = "block";
    textEditorContainer.style.display = "none";

    // Affichez ici les notes du dossier sélectionné
}

// Gérez le clic sur un dossier pour afficher ses notes
folderList.addEventListener("click", (e) => {
    if (e.target.classList.contains("folder")) {
        const folderName = e.target.textContent;
        showNotesInFolder(folderName);
    }
});

// Gérez le clic sur le bouton "Retour" pour quitter un dossier
backButton.addEventListener("click", () => {
    showInitialView();
    RefreshActiveFolder("Menu principal");
});

// Fonction pour afficher le traitement de texte dans une note
function displayNoteContent(noteName) {
    const folderName = getSelectedFolder();
    const folder = data.find((item) => item.folder === folderName);
    if (folder) {
        const noteIndex = folder.notes.indexOf(noteName);
        if (noteIndex !== -1) {
            const noteContent = folder.notes[noteIndex];
            textEditor.textContent = noteContent;
            textEditorContainer.style.display = "block";
        }
    }
}

// Gérez le clic sur une note pour afficher son contenu dans le traitement de texte
noteList.addEventListener("click", (e) => {
    if (e.target.classList.contains("note")) {
        const noteItem = e.target;
        const noteName = noteItem.textContent.trim();
        displayNoteContent(noteName);
    }
});

// Fonction pour sauvegarder le contenu du traitement de texte dans la note
function saveNoteContent() {
    const folderName = getSelectedFolder();
    const folder = data.find((item) => item.folder === folderName);
    if (folder) {
        const selectedNote = noteList.querySelector(".selected");
        if (selectedNote) {
            const noteName = selectedNote.textContent.trim();
            folder.notes = folder.notes.map((note) =>
                note === noteName ? textEditor.textContent : note
            );
            saveDataLocally(); // Sauvegardez les modifications
        }
    }
}

// Gérez le clic sur une note pour la sélectionner
noteList.addEventListener("click", (e) => {
    if (e.target.classList.contains("note")) {
        // Désélectionnez toutes les notes
        noteList.querySelectorAll(".note").forEach((note) => {
            note.classList.remove("selected");
        });

        // Sélectionnez la note cliquée
        e.target.classList.add("selected");
    }
});

// Appel initial pour afficher la vue initiale
showInitialView();

// Gérez le clic sur le bouton "Ajouter une note"
addNoteButton.addEventListener("click", () => {
    const parentFolder = data.find((item) => item.folder === ActiveFolder); // Utilisez ActiveFolder ici
    if (parentFolder) {
        const noteName = prompt("Nom de la nouvelle note :");
        if (noteName) {
            // Ajouter la nouvelle note au dossier actif
            parentFolder.notes.push(noteName);
            displayNotes(ActiveFolder); // Mettez à jour la liste des notes du dossier actif
        }
    } else {
        alert("Erreur : le dossier actif n'a pas été trouvé.");
    }
});