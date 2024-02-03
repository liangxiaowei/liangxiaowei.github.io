const Router = {
    init: () => {
        // document.querySelectorAll("a.navlink").forEach(a => {
        //     a.addEventListener("click", event => {
        //         event.preventDefault();
        //         const href = event.target.getAttribute("href");
        //         Router.go(href);
        //     });
        // });  

        window.addEventListener('popstate',  event => {
            Router.go(event.state.route, false);
        });

        // Process initial URL   
        Router.go(location.pathname);
    },    
    go: (route, addToHistory=true) => {
        if (addToHistory) {
            history.pushState({ route }, '', route);
        }

        let pageElement = null;
        switch (route) {
            case "/":
                pageElement = document.createElement("bookshelf-page");
                break;
            default:
                if (route.startsWith("/book-")) {
                    pageElement = document.createElement("book-page");
                    pageElement.dataset.bookId = route.substring(route.lastIndexOf("-")+1);
                }
                break;   
        }
        if (pageElement) {
            document.querySelector("main").innerHTML = "";
            document.querySelector("main").appendChild(pageElement);
        }
    
        window.scrollX = 0;
        window.scrollY = 0;
    }
}

export default Router;