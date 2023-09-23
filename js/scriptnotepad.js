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
            noteItem.classList.add("note"); // Ajoutez la classe "note"
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

// Gérez le clic sur les dossiers
folderList.addEventListener("click", (e) => {
    if (e.target.classList.contains("folder")) {
        const folderName = e.target.textContent;
        displayNotes(folderName); // Affichez les notes du dossier sélectionné
        RefreshActiveFolder(folderName); // Mettez à jour le dossier actif
        showNotesInFolder(folderName); // Affichez les notes du dossier
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
    const parentFolder = ActiveFolder; // Utilisez ActiveFolder ici
    if (parentFolder) {
        const noteName = prompt("Nom de la nouvelle note :");
        if (noteName) {
            // Envoyer une requête au serveur pour ajouter la nouvelle note
            const formData = new FormData();
            formData.append("addNote", "true");
            formData.append("folderName", parentFolder);
            formData.append("noteContent", noteName);

            fetch("notepad.php", {
                method: "POST",
                body: formData,
            })
            .then(response => response.text())
            .then(data => {
                if (data === "Nouvelle note ajoutée avec succès.") {
                    // Mettez à jour la liste des notes du dossier actif
                    displayNotes(parentFolder);
                } else {
                    alert("Erreur : " + data);
                }
            })
            .catch(error => {
                console.error("Erreur lors de l'ajout de la note : " + error);
            });
        }
    } else {
        alert("Erreur : le dossier actif n'a pas été trouvé.");
    }
});

// Fonction pour appliquer le style sélectionné au texte sélectionné
function applyStyle(style, value) {
    document.execCommand(style, false, value);
}

// Gérez les boutons de mise en forme (par exemple, gras, italique, souligné)
document.getElementById("bold-button").addEventListener("click", () => {
    applyStyle("bold");
});

document.getElementById("italic-button").addEventListener("click", () => {
    applyStyle("italic");
});

document.getElementById("underline-button").addEventListener("click", () => {
    applyStyle("underline");
});

// Vous pouvez ajouter d'autres boutons et styles selon vos besoins

// Gérez la mise à jour du contenu d'une note
function saveNoteContent() {
    const selectedNote = noteList.querySelector(".selected");
    if (selectedNote) {
        const noteId = selectedNote.getAttribute("data-note-id");
        const newNoteContent = textEditor.innerHTML;

        // Envoyer une requête au serveur pour mettre à jour le contenu de la note
        const formData = new FormData();
        formData.append("updateNote", "true");
        formData.append("noteId", noteId);
        formData.append("newNoteContent", newNoteContent);

        fetch("notepad.php", {
            method: "POST",
            body: formData,
        })
        .then(response => response.text())
        .then(data => {
            if (data === "Contenu de la note mis à jour avec succès.") {
                // Mettez à jour la liste des notes du dossier actif
                displayNotes(ActiveFolder);
            } else {
                alert("Erreur : " + data);
            }
        })
        .catch(error => {
            console.error("Erreur lors de la mise à jour de la note : " + error);
        });
    }
}
// Gérez la modification du contenu de la zone de texte éditable
textEditor.addEventListener("input", saveNoteContent);

// Appel initial pour afficher la vue initiale
showInitialView();