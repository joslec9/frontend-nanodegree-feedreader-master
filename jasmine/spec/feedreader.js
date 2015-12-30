/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */
/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('has defined URLs', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });


        /* This tests allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('has a Name that is not empty', function() {

            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).toBeGreaterThan(0);
            });
        });

    });


    /* A new test suite named "The menu" */
    describe('The menu', function() {
        /* Test that ensures the menu element is
         * hidden by default. */
        it('is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        /* Test that ensures the menu changes
         * visibility when the menu icon is clicked.  */
        it('changes visible when the menu icon is clicked', function() {
            //The menu should be visible when it is clicked
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(false);
            //The menu should be hidden when it is clicked again
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });


    });
    /* Test suite named "Initial Entries" */
    describe('Initial Entries', function() {
            /* Test that ensures when the loadFeed
             * function is called and completes its work, there is at least
             * a single .entry element within the .feed container.
             * Remember, loadFeed() is asynchronous so this test wil require
             * the use of Jasmine's beforeEach and asynchronous done() function.
             */

            beforeEach(function(done) {
                loadFeed(0, done);
            }));
    });

it('feed puts an entry in the feed container', function(done) {
    var entries = $('.feed').find('.entry');
    expect(entries.length >= 1).toBe(true);
    done();
});
});

/* A test suite named "New Feed Selection"*/
describe('New Feed Selection', function() {
    /* Test that ensures when a new feed is loaded
     * by the loadFeed function that the content actually changes.
     * Remember, loadFeed() is asynchronous.
     */
    /* Calls the `loadFeed` function with callbacks to ensure that
     * they're complete.
     */
    beforeEach(function(done) {
        $('.feed').empty();
        /*Load the first feed at index 0 */
        loadFeed(0, function() {
            entryTexts = $('.feed').find('h2').text();
            loadFeed(1, done);
        });
    });
    /* Tests that when a new feed is loaded by the loadFeed function
     * that the content actually changes.
     */
    it('change of content occurs when new content is loaded', function(done) {
        expect($('.feed').find('h2').text()).not.toBe(entryTexts);
        done();
    });
    // Initial feed restored post testing
    afterEach(function(done) {
        loadFeed(0, done);
    });

});

}());