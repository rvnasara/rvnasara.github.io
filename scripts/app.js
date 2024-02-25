"use strict";
// to load global google variables for api
/* global google */

(function () {

    

    function CheckLogin(){

        if(sessionStorage.getItem("user")){
            $("#login").html(`<a id="logout" class="nav-link" href="#">
                                <i class="fa-solid fa-sign-out-alt"></i> Logout</a>`)
        }
        $("#logout").on("click", function(){

            sessionStorage.clear();
            location.href = "login.html";
        });
    }

    function LoadHeader(html_data){
        $("header").html(html_data);
        $(`li>a:contains(${document.title})`).addClass("active").attr("aria-current", "page");
    openPage();
        CheckLogin();
    }

    function AjaxRequest(method, url, callback){
        //Step 1: instantiate new XHR object
        let xhr = new XMLHttpRequest();

        //Step 2: Open XHR request
        xhr.open(method, url);

        //Step 4: Add event listener for the readystatechange event
        // THe readystatechange event is triggered when the state of a document being fetched chages
        xhr.addEventListener("readystatechange", () =>{

            if(xhr.readyState === 4 && xhr.status === 200){
                if(typeof callback == "function"){
                    callback(xhr.responseText);
                }else{
                    console.error("ERROR: callback not a function");
                }
            }

        });

        //Step 3: Send XHR request
        xhr.send();
    }
    function ContactFormValidation(){
        //FullName
        ValidateField("#fullName",
            /^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]+)+([\s,-]([A-z][a-z]+))*$/,
            "Please enter valid full name.");

        //ContactNumber
        ValidateField("#contactNumber",
            /^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]\d{4}$/,
            "Please enter valid contact number");

        //EmailAddress
        ValidateField("#emailAddress",
            /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,10}$/,
            "Please enter valid email address");
    }

    function RegisterFormValidation(){

        //ContactNumber
        ValidateField("#contactNumber",
            /^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]\d{4}$/,
            "Please enter valid contact number");

        //EmailAddress
        ValidateField("#emailAddress",
            /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,10}$/,
            "Please enter valid email address");

    }

    /**
     * Validate form fields provided by users
     * @param input_field_id
     * @param regular_expression
     * @param error_message
     */
    function ValidateField(input_field_id, regular_expression, error_message){
        let messageArea = $("#messageArea").hide();

        // The "blue" event fires when an element has lost focus.
        $(input_field_id).on("blur", function (){
            let inputFieldText = $(this).val();
            if(!regular_expression.test(inputFieldText)){
                $(this).trigger("focus").trigger("select"); // select all the text in the fullName textbox
                messageArea.addClass("alert alert-danger").text(error_message).show();
            }else{
                messageArea.removeAttr("class").hide();
            }
        });
    }

    /**
     * Function to display home page
     */
    function DisplayHomePage() {
        let messageArea = $("#messageArea").hide();
        let hasDisplayed = false;
        if(!hasDisplayed && sessionStorage.getItem("alert")){
            messageArea.addClass("alert alert-success").text(sessionStorage.getItem("alert")).show();
            hasDisplayed = true;
        }
        // Remove alert message when there's page activity
        $(document).on('click', function() {
            messageArea.removeAttr("class").hide();
        });

        let ServicesButton = document.getElementById("ServicesBtn");
        ServicesButton.addEventListener("click", function () {
            location.href = "services.html"
        });

        /**
         * for image slideshow for dynamic background of harmony hub
         * @type {number}
         */
        let current = 0;
        const images = document.querySelectorAll('#slideshow img');

        setInterval(() => {
            images[current].classList.remove('active');
            current = (current + 1) % images.length;
            images[current].classList.add('active');
        }, 5000); // Change image every 5 seconds

    }

    function DisplayFooter(){
        //fixed bottom navbar
        let bottomNavbar = document.createElement("nav");
        bottomNavbar.classList.add("navbar", "fixed-bottom", "navbar-expand-lg", "navbar-dark", "bg-dark");

        let bottomNavList = document.createElement("ul");
        bottomNavList.classList.add("navbar-nav");
        //add links to the bottomNavbar
        let links = [
            { text: "Privacy Policy", href: "privacypolicy.html" },
            { text: "Terms of Service", href: "termsofservice.html" },
            { text : "Team", href: "team.html"},
            { text: "Contact", href: "contact.html" }
        ];

        // Create and append list items for each link
        links.forEach(link => {
            let listItem = document.createElement("li");
            listItem.classList.add("nav-item");

            let anchor = document.createElement("a");
            anchor.classList.add("nav-link");
            anchor.href = link.href;
            anchor.textContent = link.text;

            listItem.appendChild(anchor);
            bottomNavList.appendChild(listItem);
        });
        bottomNavbar.appendChild(bottomNavList);
        let footer = document.getElementById("footer");
        footer.appendChild(bottomNavbar);
    }


    /**
     * Function to display portfolio page
     */
    function DisplayPortfolioPage() {
        const projects = [
            {
                projectName: "Personal Website",
                description: "This project consists of creating a personal user website in C# Blazor",
                imageUrl: "./content/images/project1.png"
            },
            {
                projectName: "College Registration App",
                description: "This app was created in Visual Studio in C#" +
                    " and allowed for student data for registration to be stored in a server",
                imageUrl: "./content/images/project2.jpg"
            },

        ];

        let currentProjectIndex = 0; // Index to track the current project

        const projectContainer = document.getElementById('project-container');
        const loadMoreButton = document.getElementById('loadMoreBtn');


        function loadProjectNames() {
            projects.forEach(project => {
                const titleElement = document.createElement('h3');
                titleElement.className = 'projectNames';
                titleElement.textContent = project.projectName;
                projectContainer.appendChild(titleElement);
            });
        }

        // Function to load additional information for a project
        function loadProjectDetails() {
            if (currentProjectIndex < projects.length) {
                const project = projects[currentProjectIndex];
                const projectDetails = document.createElement('div');
                projectDetails.className = 'project-details';
                projectDetails.innerHTML = `<img src="${project.imageUrl}" alt="${project.projectName}" style="width:100%">
                                    <p>${project.description}</p>`;
                projectContainer.children[currentProjectIndex].appendChild(projectDetails);
                currentProjectIndex++;

                if (currentProjectIndex >= projects.length) {
                    loadMoreButton.style.display = 'none';
                }
            }
        }

        if (loadMoreButton) {
            loadMoreButton.addEventListener('click', loadProjectDetails);
        }

        if (projectContainer) {
            loadProjectNames();
        }

    }

    /**
     * Function to display services page
     */
    function DisplayServicesPage(){
        let acc = document.getElementsByClassName("accordion");
        let i;

        for (i = 0; i < acc.length; i++) {
            acc[i].addEventListener("click", function() {
                this.classList.toggle("active");
                let panel = this.nextElementSibling;
                if (panel.style.display === "block") {
                    panel.style.display = "none";
                } else {
                    panel.style.display = "block";
                }
            });
        }

    }
    /**
     * Function to display team page
     */
    function DisplayTeamPage(){
        // When the user clicks on a team member, open the modal
        let teamMembers = document.getElementsByClassName("team-member");
        for (let i = 0; i < teamMembers.length; i++) {
            teamMembers[i].onclick = function() {
                let modalId = this.getAttribute('data-target');
                let modal = document.getElementById(modalId);
                modal.style.display = "block";
            }
        }

        //close modal
        let closeButtons = document.getElementsByClassName("close");
        for (let i = 0; i < closeButtons.length; i++) {
            closeButtons[i].onclick = function() {
                let modal = this.closest('.modal');
                modal.style.display = "none";
            }
        }


        window.onclick = function(event) {
            if (event.target.classList.contains('modal')) {
                event.target.style.display = "none";
            }
        }

    }
    /**
     * Function to display blog page
     */
    function DisplayBlogPage(){


    }
    /**
     * Function to programmatically change the 'Blog' link to 'News'
     */
    function ChangeBlogToNews(){
        $("#blog").html(`<i class=\"fa-solid fa-newspaper\"></i>News`);
    }

    /**
     * Google Maps API to display a map on the events page
     * Location: Harmony Hub at Durham College
     *
     */
    function displayMap() {
        // Define the coordinates for the map's longitude and latitude
        const ourLocation = {lat: 43.94347381591797, lng: -78.89759063720703};

        // Create a new map instance
        const map = new google.maps.Map(document.getElementById('map'), {
            zoom: 15, // how much the map is zoomed in
            center: ourLocation
        });

        // Create a marker and place it on the map
        const marker = new google.maps.Marker({
            position: ourLocation,
            map: map,
            title: 'Our location'
        });
    }

    /**
     * Function to display contact page
     */
    function DisplayContactPage() {

        ContactFormValidation();

        console.log("Called DisplayContactPage()");


        let sendButton = document.getElementById("sendButton");
        let subscribeCheckbox = document.getElementById("subscribeCheckbox");

        sendButton.addEventListener("click", function(){
            if(subscribeCheckbox.checked){
                let contact = new Contact(fullName.value, contactNumber.value, emailAddress.value)
                if(contact.serialize()){
                    let key = contact.fullName.substring(0,1) + Date.now();
                    localStorage.setItem(key, contact.serialize())
                }

            }
        });


    }

    /**
     * Function to display privacy policy page
     */
    function DisplayPrivacyPolicyPage(){
        let textFile = document.getElementById("text-file")
        fetch('content/policies/privacypolicy.txt')
            .then(response => response.text())
            .then(data => {textFile.innerText = data;})
            .catch(error =>{console.error("Unable to open policy page", error)})
    }

    /**
     * Function to display terms of service page
     */
    function DisplayTermsOfServicePage(){
        let textFile = document.getElementById("text-file")
        fetch('content/policies/termsofservice.txt')
            .then(response => response.text())
            .then(data => {textFile.innerText = data;})
            .catch(error =>{console.error("Unable to open policy page", error)})
    }

    function DisplayRegisterPage(){
        console.log("Called DisplayRegisterPage()");
    }

    function DisplayLoginPage(){
        console.log("Called DisplayLoginPage()");

        let messageArea = $("#messageArea").hide();

        $("#loginButton").on("click", function(){
            let success = false;
            let newUser = new core.User();

            $.get("./data/users.json", function(data){

                // request succeeded
                for(const user of data.users){
                    console.log(data.user);
                    if(username.value === user.Username && password.value === user.Password){

                        newUser.fromJSON(user);
                        success = true;
                        break;
                    }

                }

                if(success){
                    sessionStorage.setItem("user", newUser.serialize());
                    messageArea.removeAttr("class").hide();
                    location.href = "index.html";
                    sessionStorage.setItem("alert",`Welcome back, ${newUser.firstName}. You have successfully logged in`);
                }else{
                    $("#user").trigger("focus").trigger("select");
                    messageArea.addClass("alert alert-danger").text("Error: Invalid Credentials").show();
                }

                $("#cancelButton").on("click", function(){
                    document.forms[0].reset();
                    location.href = "index.html";

                });

            });

        });

    }

    function DisplayEventsPage() {
        displayMap(); //call displayMap() function
    }


    function LoadEvents(response){
        const data = JSON.parse(response);
        displayEvents(data.events);
    }
    function displayEvents(events) {
        const eventsList = $('#eventsList');

        $.each(events, function(index, event) {
            const eventElement = $('<div>');
            eventElement.html(`
            <h2>${event.Title}</h2>
            <p><strong>Date:</strong> ${event.Date}</p>
            <p><strong>Description:</strong> ${event.Description}</p>
            <hr>
        `);
            eventsList.append(eventElement);
        });
    }

    function DisplayGalleryPage() {


    }
    /**
     * Lightbox function to display image gallery fetching images from json.
     */
    function initializeLightbox() {
        const lightbox = document.getElementById('lightbox');
        const lightboxImage = document.getElementById('lightbox-image');
        const closeButton = document.querySelector('.lightbox .close');
        const prevButton = document.querySelector('.lightbox .prev');
        const nextButton = document.querySelector('.lightbox .next');
        const gallery = document.querySelector('.gallery');
        let galleryImages; // Will hold the list of img elements once they are loaded
        let currentIndex = 0; // Initialize current index to track the current image

        // Function to open the lightbox and display the clicked image
        function openLightbox(index) {
            currentIndex = index;
            setCurrentImage(currentIndex);
            lightbox.style.display = 'block';
        }

        // Function to close the lightbox
        function closeLightbox() {
            lightbox.style.display = 'none';
        }

        // Function to set the current image in the lightbox
        function setCurrentImage(index) {
            const imageSrc = galleryImages[index].src;
            lightboxImage.src = imageSrc;

        }

        // Function to change the image based on navigation (prev/next)
        function changeImage(step) {
            currentIndex = (currentIndex + step + galleryImages.length) % galleryImages.length;
            setCurrentImage(currentIndex);
        }

        // Event listeners for close, previous, and next buttons
        closeButton.onclick = () => closeLightbox();
        prevButton.onclick = () => changeImage(-1);
        nextButton.onclick = () => changeImage(1);

        // Fetch images from JSON
        fetch('data/gallery-images.json')
            .then(response => response.json())
            .then(data => {
                data.images.forEach((img, index) => {
                    const imageElement = document.createElement('img');
                    imageElement.src = img.src;
                    imageElement.alt = img.alt;
                    imageElement.onclick = () => openLightbox(index);
                    gallery.appendChild(imageElement);
                });

                // After images are loaded, update the galleryImages
                galleryImages = document.querySelectorAll('.gallery img');
            })
            .catch(error => console.error('Error loading images:', error));
    }


    /**
     * openPage allows the search to execute the opening of a specific page
     */

    function openPage(){
        const searchInputValue = document.getElementById("searchInput").value.toLowerCase();
        if (searchInputValue === "event") {
            location.href= "events.html";
        }
        if (searchInputValue === "gallery" || searchInputValue==="images" || searchInputValue==="pics") {
            location.href= "gallery.html";
        }
        if (searchInputValue === "home") {
            location.href= "index.html";
        }
        document.getElementById('searchForm').addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent form submission
            openPage(); // Perform the search action

        });
    }
    function FeedbackFormSubmit() {
        $('#feedbackForm').on('submit', function(event) {
            event.preventDefault(); // Prevent the form from submitting

            // gather feedback data from the form
            let feedbackData = {
                name: $('#feedbackName').val(),
                rating: $('#feedbackRating').val(),
                comments: $('#feedbackComments').val()
            };
            // Convert feedback data to a string for storage
            let feedbackDataString = JSON.stringify(feedbackData);

            // Store feedback data in local storage
            localStorage.setItem('feedback', feedbackDataString);

            // Display a success message to the user
            $('#alertArea').html(`
            <div class="alert alert-success alert-dismissible fade show" role="alert">
                Thank you for your feedback!
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `);

            // Reset the form after successful submission
            $('#feedbackForm')[0].reset();


        });

    }



    /**
     * Function to start app
     */
    function Start(){
        console.log("App Started!");
        AjaxRequest("GET", "header.html", LoadHeader);
        AjaxRequest("GET", "./data/events.json", LoadEvents);


            switch(document.title)
        {

            case "Home":
                DisplayHomePage();
                break;
            case "Our Portfolio":
                DisplayPortfolioPage();
                break;
            case "Our Team":
                DisplayTeamPage();
                break;
            case "Our Services":
                DisplayServicesPage();
                break;
            case "Blog":
                DisplayBlogPage();
                break;
            case "Contact":
                DisplayContactPage();
                break;
            case "Privacy Policy":
                DisplayPrivacyPolicyPage();
                break;
            case "Terms of Service":
                DisplayTermsOfServicePage();
                break;
            case "Register":
                DisplayRegisterPage();
                break;
            case "Login":
                DisplayLoginPage();
                break;
            case "Gallery":
                DisplayGalleryPage();
                initializeLightbox();
                break;
            case "Events":
                DisplayEventsPage();
                break;

        }
    }


    window.addEventListener("load", Start)
    window.openPage = openPage;
    FeedbackFormSubmit();
    DisplayGalleryPage();
    DisplayFooter();
    DisplayEventsPage();
    ChangeBlogToNews();

})();
