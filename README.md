# strangers-things

https://strangers-things.herokuapp.com/api/

synth project for FSA

Grading Stranger's Things (Requirements & Mockup)
Grading "Stranger's Things"

Common Requirements account for 30% of your grade, where Application Specific Requirements account for 70%.

For each listed requirement or story you can score as follows:
Common Requirement (Instructor/Eng Stories) Application Specific Requirement (User Stories)
2 Points Student shows mastery of material Student has completely fulfilled story requrement
1 Point Student has partially incorrect understanding of material Student has partially fulfilled story requirement, with some progress
0 Points Student has deep misunderstandings of material Student has not attempted to fulfill the story requirement, or has done so with very little progress
Common Requirements (30%)

As an instructor I want to see you demonstrate mastery (when appropriate) of:

    Javascript Basics
        variable declaration (correct use of let and const) ✔
        loop usage (map, forEach, for or while loops) ✔
        control structures (if, else, else if, ternaries) ✔
        function declaration ✔
        function invocation ✔
        usage of basic data types ✔
        usage of complex data types, like arrays and objects ✔
    AJAX Basics
        usage of HTTP Methods (GET/POST/PATCH/DELETE) ✔
        handling of asychronous coding for requests ✔
        usage of try/catch blocks within async functions ✔
        updating the DOM with results of data requests ✔
    Front-End Basics including:
        Well developed React components
            proper usage of props to share data & functions between components ✔
            proper usage of event listeners on React components ✔
            proper usage of state and effects ✔
        Well implemented routes (React Router)
    CSS Basics including:
        proper use of Flex / Grid for creating layouts ✔
        proper use of cascading and specificity to prevent bleed into unrelated elements ✔
    Developing a good User Experience (UX) through a clean interface ✔

As an engineering manager I want to see code (HTML, CSS, and JS) that:

    is cleanly written ✔
    has no unused functions or variables ✔
    has expressive variable, function, and CSS class names ✔
    is organized into a coherent flow ✔

Application Specific Requirements (70%)

Your task is to build out a Craigslist-Lite, complete with users, posts, and messages.

    Routes via React Router (This is a minimum; you could have more than just these routes. These routes may be named as you wish.):
        /posts ✔
        /profile (with messages) ✔
        /login and /register (this could alternatively be displayed in the profile instead of living in its own route) ✔

    Unauthenticated Users should be able to:
        See a list of all posts ✔
        Sign up for an account with username and password ✔
        Sign in with correct username/password combination ✔

    Unauthenticated Users should not be able to:
        Create a new post ✔
        Delete any post ✔
        Send a message to the author of any post ✔

    Authenticated Users should be able to:
        Create a new post ✔
        Delete a post for which they are the author ✔
        Send a message to the author of any post for which they are not the author ✔
        See all messages for any post for which they are the author ✔
        See all messages they've received in a special view

    Authenticated Users should not be able to:
        Delete posts for which they are not the author ✔
        Send a message to themselves ✔

    All users should be able to:
        Filter posts with a simple text matcher (no fetch call needed here) ✔

    Opportunity for EXTRA CREDIT of up to 5% added to your overall score. Authenticated Users would be delighted to be able to:
        Edit a post for which they are the author ✔
