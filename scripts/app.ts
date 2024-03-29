"use strict";
// to load global google variables for api
/* global google */


(function() {

    /**
     * Binds click, mouseover and mouseout events to anchor tags with class 'link' and a matching data attribute
     * Applies CSS changes for visual feedback and handles link activation on click
     * @param link
     */
    function AddLinkEvents(link:string):void{

        let linkQuery = $(`a.link[data=${link}]`);

        linkQuery.off("click");
        linkQuery.off("mouseover");
        linkQuery.off("mouseout");

        linkQuery.css("text-decoration", "underline");
        linkQuery.css("color", "blue");

        linkQuery.on("click", function (){
            LoadLink(`${link}`);
        });

        linkQuery.on("mouseover", function (){
            $(this).css("cursor", "pointer");
            $(this).css("font-weight", "bold");
        });

        linkQuery.on("mouseout", function (){
            $(this).css("font-weight", "normal");
        });
    }

    /**
     * Sets up event listeners for navigation links found within the list items of unsorted lists
     * Removes any existing click and mouseover events before adding new ones to control navigation behaviour and
     * visual cue.
     * @returns {void}
     */
    function AddNavigationEvents():void{

        let navLinks = $("ul>li>a"); // Find all navigation links

        navLinks.off("click");
        navLinks.off("mouseover");

        navLinks.on("click", function(){
            LoadLink($(this).attr("data") as string);
        });

        navLinks.on("mouseover", function(){
            $(this).css("cursor", "pointer");
        });
    }

    /**
     * Updates the application current active link, manages authentication and updates the browser history and page title
     * It also updates navigation UI to reflect the current active link and loads the corresponding content
     * @param link
     * @param data
     * @returns {void}
     */
    function LoadLink(link:string, data:string = ""):void{

        router.ActiveLink = link;
        AuthGuard();
        router.LinkData = data;

        history.pushState({}, "", router.ActiveLink);

        document.title = capitalizeFirstCharacter(router.ActiveLink);

        $("ul>li>a").each(function() {
            $(this).removeClass("active");
        });

        $(`li>a:contains(${document.title})`).addClass("active");

        LoadContent();
    }

    function AuthGuard(){
        let protected_route = ["events"];

        if (protected_route.indexOf(router.ActiveLink)>-1) {
            if (!sessionStorage.getItem("user")) {
                router.ActiveLink = "login";
            }
        }
    }

    function CheckLogin(){

        if(sessionStorage.getItem("user")){
            $("#login").html(`<a id="logout" class="nav-link" href="#"><i class="fas fa-sign-out-alt"></i> Logout</a>`)
        }

        $("#logout").on("click", function (){
            sessionStorage.clear();
            $("#login").html(`<a class="nav-link" data="login"><i class="fas fa-sign-in-alt"></i> Login</a>`)
            AddNavigationEvents();
            LoadLink("login");
        });
    }

    function LoadHeader(){
        $.get("./views/components/header.html", function(html_data){
            $("header").html(html_data);
            document.title = capitalizeFirstCharacter(router.ActiveLink);

            $(`li>a:contains(${document.title})`).addClass("active").attr("aria-current", "page");
            AddNavigationEvents();
            CheckLogin();
        });
    }
    function capitalizeFirstCharacter(str:string){
        return str.charAt(0).toUpperCase() + str.slice(1);
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


    /**
     * Validate form fields provided by users
     * @param input_field_id
     * @param regular_expression
     * @param error_message
     */
    function ValidateField(input_field_id: string, regular_expression: RegExp, error_message: string){
        let messageArea = $("#messageArea").hide();

        // The "blue" event fires when an element has lost focus.
        $(input_field_id).on("blur", function (){
            let inputFieldText = $(this).val() as string;
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
        let alertMessage = sessionStorage.getItem("alert");
        if (!hasDisplayed) {
            if (alertMessage !== null) {
                messageArea.addClass("alert alert-success").text(alertMessage).show();
                hasDisplayed = true;
            }
        }
        // Remove alert message when there's page activity
        $(document).on('click', function() {
            messageArea.removeAttr("class").hide();
        });

        let ServicesButton = document.getElementById("ServicesBtn") as HTMLElement;
        ServicesButton.addEventListener("click", function () {
            LoadLink("services");
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

        let projectContainer = document.getElementById('project-container') as HTMLElement;
        let loadMoreButton = document.getElementById('loadMoreBtn') as HTMLElement;


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
            acc[i].addEventListener("click", function(this: HTMLElement) {
                this.classList.toggle("active");
                let panel = this.nextElementSibling as HTMLElement;
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
        let teamMembers = document.getElementsByClassName("team-member") as HTMLCollectionOf<HTMLElement>;
        for (let i = 0; i < teamMembers.length; i++) {
            teamMembers[i].onclick = function() {
                let modalId = (this as HTMLElement).getAttribute('data-target') as string;
                let modal = document.getElementById(modalId) as HTMLElement;
                modal.style.display = "block";
            }
        }

        //close modal
        let closeButtons = document.getElementsByClassName("close") as HTMLCollectionOf<HTMLElement>;
        for (let i = 0; i < closeButtons.length; i++) {
            closeButtons[i].onclick = function() {
                let modal = (this as HTMLElement).closest('.modal') as HTMLElement;
                modal.style.display = "none";
            }
        }

        window.onclick = function(event: MouseEvent) {
            const target = event.target as HTMLElement;
            if (target && target.classList.contains('modal')) {
                target.style.display = "none";
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
        const map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
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
        console.log("Called DisplayContactPage()");

        ContactFormValidation();

        let sendButton = document.getElementById("sendButton") as HTMLElement;
        let subscribeCheckbox = document.getElementById("subscribeCheckbox") as HTMLInputElement;

        sendButton.addEventListener("click", function () {
            if (subscribeCheckbox.checked) {
                let fullName = document.forms[0].fullName.value;
                let contactNumber = document.forms[0].contactNumber.value;
                let emailAddress = document.forms[0].emailAddress.value;
                let contact = new core.Contact(fullName.value, contactNumber.value, emailAddress.value)
                if (contact.serialize()) {
                    let key = contact.fullName.substring(0, 1) + Date.now();
                    localStorage.setItem(key, contact.serialize() as string)
                }
            }
        });
    }

    /**
     * Function to display privacy policy page
     */
    function DisplayPrivacyPolicyPage(){
        let textFile = document.getElementById("text-file") as HTMLElement;
        fetch('content/policies/privacypolicy.txt')
            .then(response => response.text())
            .then(data => {textFile.innerText = data;})
            .catch(error =>{console.error("Unable to open policy page", error)})
    }

    /**
     * Function to display terms of service page
     */
    function DisplayTermsOfServicePage(){
        let textFile = document.getElementById("text-file") as HTMLElement;

        fetch('content/policies/termsofservice.txt')
            .then(response => response.text())
            .then(data => {textFile.innerText = data;})
            .catch(error =>{console.error("Unable to open policy page", error)})
    }

    function DisplayRegisterPage(){
        console.log("Called DisplayRegisterPage()");
        AddLinkEvents("login");
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
                    let username = document.forms[0].username.value
                    let password = document.forms[0].password.value

                    if(username === user.Username && password === user.Password){
                        success = true;
                        newUser.fromJSON(user);
                        break;
                    }
                }

                if(success){
                    sessionStorage.setItem("user", newUser.serialize() as string);
                    messageArea.removeAttr("class").hide();
                    LoadLink("home");
                    sessionStorage.setItem("alert",`Welcome back, ${newUser.firstName}. You have successfully logged in`);
                }else{

                    $("#username").trigger("focus").trigger("select");
                    messageArea
                        .addClass("alert alert-danger")
                        .text("Error: Invalid Login Credentials")
                        .show();
                }
            });
        });

        $("#cancelButton").on("click", function(){
            document.forms[0].reset();
            LoadLink("home");
        });
    }

    function DisplayEventsPage() {
        displayMap(); //call displayMap() function
    }


    function LoadEvents(){
        const response = "";
        const data = JSON.parse(response);
        displayEvents(data.events);
    }
    function displayEvents(events: any) {
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
        console.log("DisplayGalleryPage");
    }
    /**
     * Lightbox function to display image gallery fetching images from json.
     */
    function initializeLightbox() {
        let lightbox = document.getElementById('lightbox') as HTMLElement;
        let lightboxImage = document.getElementById('lightbox-image') as HTMLImageElement;
        let closeButton = document.querySelector('.lightbox .close') as HTMLElement;
        let prevButton = document.querySelector('.lightbox .prev') as HTMLElement
        let nextButton = document.querySelector('.lightbox .next') as HTMLElement;
        let gallery = document.querySelector('.gallery') as HTMLElement;
        let galleryImages: any; // Will hold the list of img elements once they are loaded
        let currentIndex = 0; // Initialize current index to track the current image

        // Function to open the lightbox and display the clicked image
        function openLightbox(index: any) {
            currentIndex = index;
            setCurrentImage(currentIndex);
            lightbox.style.display = 'block';
        }

        // Function to close the lightbox
        function closeLightbox() {
            lightbox.style.display = 'none';
        }

        // Function to set the current image in the lightbox
        function setCurrentImage(index: any) {
            lightboxImage.src = galleryImages[index].src;

        }

        // Function to change the image based on navigation (prev/next)
        function changeImage(step: number) {
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
                data.images.forEach((img: { src: string; alt: string; }, index: any) => {
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

    function openPage() {
        let searchInputElement = document.getElementById("searchInput") as HTMLInputElement | null;
        if (searchInputElement !== null) {
            let searchInputValue = searchInputElement.value.toLowerCase();
            if (searchInputValue === "event") {
                LoadLink("events");
            }
            if (searchInputValue === "gallery" || searchInputValue === "images" || searchInputValue === "pics") {
                LoadLink("gallery");
            }
            if (searchInputValue === "home") {
                LoadLink("home");
            }
        }
    }

    document.getElementById('searchForm')?.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission
        openPage(); // Perform the search action
    });
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
            let feedbackForm = $('#feedbackForm')[0] as HTMLFormElement;
            feedbackForm.reset();


        });

    }

    function Display404Page(){
        console.log("Called Display404Page()");
    }

    function DisplayCareersPage(){
        console.log("Called DisplayCareersPage()")
    }

    function LoadFooter(){
        $.get("/views/component/footer.html", function (html_data){
            $("footer").html(html_data);

        });
    }
    function LoadContent(){
        let page_name = router.ActiveLink;
        let callback = ActiveLinkCallback();

        $.get(`./views/content/${page_name}.html`, function(html_data){
            $("main").html(html_data);
            CheckLogin();
            callback();
        });
    }

    function ActiveLinkCallback(): Function {
        switch (router.ActiveLink){
            case "home": return  DisplayHomePage;
            case "blog": return DisplayBlogPage;
            case "careers": return DisplayCareersPage;
            case "contact" : return DisplayContactPage;
            case "events": return DisplayEventsPage;
            case "gallery": return DisplayGalleryPage;
            case "login": return DisplayLoginPage;
            case "portfolio": return DisplayPortfolioPage;
            case "privacypolicy" : return DisplayPrivacyPolicyPage;
            case "register" : return DisplayRegisterPage;
            case "services" : return DisplayServicesPage;
            case "team" : return DisplayTeamPage;
            case "termsofservice" : return DisplayTermsOfServicePage;
            case "404": return Display404Page;
            default:
                console.error("Error: callback does not exist " + router.ActiveLink);
                return new Function();

        }
    }
    /**
     * Function to start app
     */
    function Start(){
        console.log("App Started!");
        LoadHeader();
        LoadEvents();
        LoadLink("home");
        LoadFooter();
    }
    window.addEventListener("load", Start);
   // window.openPage = openPage;
    FeedbackFormSubmit();
    ChangeBlogToNews();

})();