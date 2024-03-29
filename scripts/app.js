"use strict";
(function () {
    var _a;
    function AddLinkEvents(link) {
        var linkQuery = $("a.link[data=".concat(link, "]"));
        linkQuery.off("click");
        linkQuery.off("mouseover");
        linkQuery.off("mouseout");
        linkQuery.css("text-decoration", "underline");
        linkQuery.css("color", "blue");
        linkQuery.on("click", function () {
            LoadLink("".concat(link));
        });
        linkQuery.on("mouseover", function () {
            $(this).css("cursor", "pointer");
            $(this).css("font-weight", "bold");
        });
        linkQuery.on("mouseout", function () {
            $(this).css("font-weight", "normal");
        });
    }
    function AddNavigationEvents() {
        var navLinks = $("ul>li>a");
        navLinks.off("click");
        navLinks.off("mouseover");
        navLinks.on("click", function () {
            LoadLink($(this).attr("data"));
        });
        navLinks.on("mouseover", function () {
            $(this).css("cursor", "pointer");
        });
    }
    function LoadLink(link, data) {
        if (data === void 0) { data = ""; }
        router.ActiveLink = link;
        AuthGuard();
        router.LinkData = data;
        history.pushState({}, "", router.ActiveLink);
        document.title = capitalizeFirstCharacter(router.ActiveLink);
        $("ul>li>a").each(function () {
            $(this).removeClass("active");
        });
        $("li>a:contains(".concat(document.title, ")")).addClass("active");
        LoadContent();
    }
    function AuthGuard() {
        var protected_route = ["events"];
        if (protected_route.indexOf(router.ActiveLink) > -1) {
            if (!sessionStorage.getItem("user")) {
                router.ActiveLink = "login";
            }
        }
    }
    function CheckLogin() {
        if (sessionStorage.getItem("user")) {
            $("#login").html("<a id=\"logout\" class=\"nav-link\" href=\"#\"><i class=\"fas fa-sign-out-alt\"></i> Logout</a>");
        }
        $("#logout").on("click", function () {
            sessionStorage.clear();
            $("#login").html("<a class=\"nav-link\" data=\"login\"><i class=\"fas fa-sign-in-alt\"></i> Login</a>");
            AddNavigationEvents();
            LoadLink("login");
        });
    }
    function LoadHeader() {
        $.get("./views/components/header.html", function (html_data) {
            $("header").html(html_data);
            document.title = capitalizeFirstCharacter(router.ActiveLink);
            $("li>a:contains(".concat(document.title, ")")).addClass("active").attr("aria-current", "page");
            AddNavigationEvents();
            CheckLogin();
        });
    }
    function capitalizeFirstCharacter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    function ContactFormValidation() {
        ValidateField("#fullName", /^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]+)+([\s,-]([A-z][a-z]+))*$/, "Please enter valid full name.");
        ValidateField("#contactNumber", /^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]\d{4}$/, "Please enter valid contact number");
        ValidateField("#emailAddress", /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,10}$/, "Please enter valid email address");
    }
    function ValidateField(input_field_id, regular_expression, error_message) {
        var messageArea = $("#messageArea").hide();
        $(input_field_id).on("blur", function () {
            var inputFieldText = $(this).val();
            if (!regular_expression.test(inputFieldText)) {
                $(this).trigger("focus").trigger("select");
                messageArea.addClass("alert alert-danger").text(error_message).show();
            }
            else {
                messageArea.removeAttr("class").hide();
            }
        });
    }
    function DisplayHomePage() {
        var messageArea = $("#messageArea").hide();
        var hasDisplayed = false;
        var alertMessage = sessionStorage.getItem("alert");
        if (!hasDisplayed) {
            if (alertMessage !== null) {
                messageArea.addClass("alert alert-success").text(alertMessage).show();
                hasDisplayed = true;
            }
        }
        $(document).on('click', function () {
            messageArea.removeAttr("class").hide();
        });
        var ServicesButton = document.getElementById("ServicesBtn");
        ServicesButton.addEventListener("click", function () {
            LoadLink("services");
        });
        var current = 0;
        var images = document.querySelectorAll('#slideshow img');
        setInterval(function () {
            images[current].classList.remove('active');
            current = (current + 1) % images.length;
            images[current].classList.add('active');
        }, 5000);
    }
    function DisplayPortfolioPage() {
        var projects = [
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
        var currentProjectIndex = 0;
        var projectContainer = document.getElementById('project-container');
        var loadMoreButton = document.getElementById('loadMoreBtn');
        function loadProjectNames() {
            projects.forEach(function (project) {
                var titleElement = document.createElement('h3');
                titleElement.className = 'projectNames';
                titleElement.textContent = project.projectName;
                projectContainer.appendChild(titleElement);
            });
        }
        function loadProjectDetails() {
            if (currentProjectIndex < projects.length) {
                var project = projects[currentProjectIndex];
                var projectDetails = document.createElement('div');
                projectDetails.className = 'project-details';
                projectDetails.innerHTML = "<img src=\"".concat(project.imageUrl, "\" alt=\"").concat(project.projectName, "\" style=\"width:100%\">\n                                    <p>").concat(project.description, "</p>");
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
    function DisplayServicesPage() {
        var acc = document.getElementsByClassName("accordion");
        var i;
        for (i = 0; i < acc.length; i++) {
            acc[i].addEventListener("click", function () {
                this.classList.toggle("active");
                var panel = this.nextElementSibling;
                if (panel.style.display === "block") {
                    panel.style.display = "none";
                }
                else {
                    panel.style.display = "block";
                }
            });
        }
    }
    function DisplayTeamPage() {
        var teamMembers = document.getElementsByClassName("team-member");
        for (var i = 0; i < teamMembers.length; i++) {
            teamMembers[i].onclick = function () {
                var modalId = this.getAttribute('data-target');
                var modal = document.getElementById(modalId);
                modal.style.display = "block";
            };
        }
        var closeButtons = document.getElementsByClassName("close");
        for (var i = 0; i < closeButtons.length; i++) {
            closeButtons[i].onclick = function () {
                var modal = this.closest('.modal');
                modal.style.display = "none";
            };
        }
        window.onclick = function (event) {
            var target = event.target;
            if (target && target.classList.contains('modal')) {
                target.style.display = "none";
            }
        };
    }
    function DisplayBlogPage() {
    }
    function ChangeBlogToNews() {
        $("#blog").html("<i class=\"fa-solid fa-newspaper\"></i>News");
    }
    function displayMap() {
        var ourLocation = { lat: 43.94347381591797, lng: -78.89759063720703 };
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 15,
            center: ourLocation
        });
        var marker = new google.maps.Marker({
            position: ourLocation,
            map: map,
            title: 'Our location'
        });
    }
    function DisplayContactPage() {
        console.log("Called DisplayContactPage()");
        ContactFormValidation();
        var sendButton = document.getElementById("sendButton");
        var subscribeCheckbox = document.getElementById("subscribeCheckbox");
        sendButton.addEventListener("click", function () {
            if (subscribeCheckbox.checked) {
                var fullName = document.forms[0].fullName.value;
                var contactNumber = document.forms[0].contactNumber.value;
                var emailAddress = document.forms[0].emailAddress.value;
                var contact = new core.Contact(fullName.value, contactNumber.value, emailAddress.value);
                if (contact.serialize()) {
                    var key = contact.fullName.substring(0, 1) + Date.now();
                    localStorage.setItem(key, contact.serialize());
                }
            }
        });
    }
    function DisplayPrivacyPolicyPage() {
        var textFile = document.getElementById("text-file");
        fetch('content/policies/privacypolicy.txt')
            .then(function (response) { return response.text(); })
            .then(function (data) { textFile.innerText = data; })
            .catch(function (error) { console.error("Unable to open policy page", error); });
    }
    function DisplayTermsOfServicePage() {
        var textFile = document.getElementById("text-file");
        fetch('content/policies/termsofservice.txt')
            .then(function (response) { return response.text(); })
            .then(function (data) { textFile.innerText = data; })
            .catch(function (error) { console.error("Unable to open policy page", error); });
    }
    function DisplayRegisterPage() {
        console.log("Called DisplayRegisterPage()");
        AddLinkEvents("login");
    }
    function DisplayLoginPage() {
        console.log("Called DisplayLoginPage()");
        var messageArea = $("#messageArea").hide();
        $("#loginButton").on("click", function () {
            var success = false;
            var newUser = new core.User();
            $.get("./data/users.json", function (data) {
                for (var _i = 0, _a = data.users; _i < _a.length; _i++) {
                    var user = _a[_i];
                    console.log(data.user);
                    var username = document.forms[0].username.value;
                    var password = document.forms[0].password.value;
                    if (username.value === user.Username && password.value === user.Password) {
                        newUser.fromJSON(user);
                        success = true;
                        break;
                    }
                }
                if (success) {
                    sessionStorage.setItem("user", newUser.serialize());
                    messageArea.removeAttr("class").hide();
                    LoadLink("home");
                    sessionStorage.setItem("alert", "Welcome back, ".concat(newUser.firstName, ". You have successfully logged in"));
                }
                else {
                    $("#user").trigger("focus").trigger("select");
                    messageArea.addClass("alert alert-danger").text("Error: Invalid Credentials").show();
                }
                $("#cancelButton").on("click", function () {
                    document.forms[0].reset();
                    LoadLink("home");
                });
            });
        });
    }
    function DisplayEventsPage() {
        displayMap();
    }
    function LoadEvents() {
        var response = "";
        var data = JSON.parse(response);
        displayEvents(data.events);
    }
    function displayEvents(events) {
        var eventsList = $('#eventsList');
        $.each(events, function (index, event) {
            var eventElement = $('<div>');
            eventElement.html("\n            <h2>".concat(event.Title, "</h2>\n            <p><strong>Date:</strong> ").concat(event.Date, "</p>\n            <p><strong>Description:</strong> ").concat(event.Description, "</p>\n            <hr>\n        "));
            eventsList.append(eventElement);
        });
    }
    function DisplayGalleryPage() {
        console.log("DisplayGalleryPage");
    }
    function initializeLightbox() {
        var lightbox = document.getElementById('lightbox');
        var lightboxImage = document.getElementById('lightbox-image');
        var closeButton = document.querySelector('.lightbox .close');
        var prevButton = document.querySelector('.lightbox .prev');
        var nextButton = document.querySelector('.lightbox .next');
        var gallery = document.querySelector('.gallery');
        var galleryImages;
        var currentIndex = 0;
        function openLightbox(index) {
            currentIndex = index;
            setCurrentImage(currentIndex);
            lightbox.style.display = 'block';
        }
        function closeLightbox() {
            lightbox.style.display = 'none';
        }
        function setCurrentImage(index) {
            lightboxImage.src = galleryImages[index].src;
        }
        function changeImage(step) {
            currentIndex = (currentIndex + step + galleryImages.length) % galleryImages.length;
            setCurrentImage(currentIndex);
        }
        closeButton.onclick = function () { return closeLightbox(); };
        prevButton.onclick = function () { return changeImage(-1); };
        nextButton.onclick = function () { return changeImage(1); };
        fetch('data/gallery-images.json')
            .then(function (response) { return response.json(); })
            .then(function (data) {
                data.images.forEach(function (img, index) {
                    var imageElement = document.createElement('img');
                    imageElement.src = img.src;
                    imageElement.alt = img.alt;
                    imageElement.onclick = function () { return openLightbox(index); };
                    gallery.appendChild(imageElement);
                });
                galleryImages = document.querySelectorAll('.gallery img');
            })
            .catch(function (error) { return console.error('Error loading images:', error); });
    }
    function openPage() {
        var searchInputElement = document.getElementById("searchInput");
        if (searchInputElement !== null) {
            var searchInputValue = searchInputElement.value.toLowerCase();
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
    (_a = document.getElementById('searchForm')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', function (event) {
        event.preventDefault();
        openPage();
    });
    function FeedbackFormSubmit() {
        $('#feedbackForm').on('submit', function (event) {
            event.preventDefault();
            var feedbackData = {
                name: $('#feedbackName').val(),
                rating: $('#feedbackRating').val(),
                comments: $('#feedbackComments').val()
            };
            var feedbackDataString = JSON.stringify(feedbackData);
            localStorage.setItem('feedback', feedbackDataString);
            $('#alertArea').html("\n            <div class=\"alert alert-success alert-dismissible fade show\" role=\"alert\">\n                Thank you for your feedback!\n                <button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"alert\" aria-label=\"Close\"></button>\n            </div>\n        ");
            var feedbackForm = $('#feedbackForm')[0];
            feedbackForm.reset();
        });
    }
    function Display404Page() {
        console.log("Called Display404Page()");
    }
    function DisplayCareersPage() {
        console.log("Called DisplayCareersPage()");
    }
    function LoadFooter() {
        $.get("/views/component/footer.html", function (html_data) {
            $("footer").html(html_data);
        });
    }
    function LoadContent() {
        var page_name = router.ActiveLink;
        var callback = ActiveLinkCallback();
        $.get("./views/content/".concat(page_name, ".html"), function (html_data) {
            $("main").html(html_data);
            CheckLogin();
            callback();
        });
    }
    function ActiveLinkCallback() {
        switch (router.ActiveLink) {
            case "home": return DisplayHomePage;
            case "blog": return DisplayBlogPage;
            case "careers": return DisplayCareersPage;
            case "contact": return DisplayContactPage;
            case "events": return DisplayEventsPage;
            case "gallery": return DisplayGalleryPage;
            case "login": return DisplayLoginPage;
            case "portfolio": return DisplayPortfolioPage;
            case "privacypolicy": return DisplayPrivacyPolicyPage;
            case "register": return DisplayRegisterPage;
            case "services": return DisplayServicesPage;
            case "team": return DisplayTeamPage;
            case "termsofservice": return DisplayTermsOfServicePage;
            case "404": return Display404Page;
            default:
                console.error("Error: callback does not exist " + router.ActiveLink);
                return new Function;
        }
    }
    function Start() {
        console.log("App Started!");
        LoadHeader();
        LoadEvents();
        LoadLink("home");
        LoadFooter();
    }
    window.addEventListener("load", Start);
    FeedbackFormSubmit();
    DisplayGalleryPage();
    DisplayEventsPage();
    ChangeBlogToNews();
})();
//# sourceMappingURL=app.js.map