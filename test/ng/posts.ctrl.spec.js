describe('posts.ctrl', function() {
 beforeEach(module('app'));
 var $scope;

 var mockPostsSvc = {};
 beforeEach(inject(function($q) {
  mockPostsSvc.fetch = function() {
   var deferred = $q.defer();
   deferred.resolve([
    {username: 'ono', body: 'first post'},
    {username: 'ono', body: 'second post'}
   ])
  return deferred.promise;
  }
  mockPostsSvc.create = function () {
   var deferred = $q.defer();
   deferred.resolve();
   return deferred.promise;
  }
 }));

 beforeEach(inject(function($rootScope, $controller) {
  $scope = $rootScope.$new();
  $controller('PostsCtrl', {
   $scope: $scope,
   PostsSvc: mockPostsSvc
  });
 }));
 
 /*
 it('loads posts from the service', function() {
  $scope.$digest();
  expect($scope.posts).to.have.length(2);
 });
 */
 it('sends a new post to the service', function() {
  sinon.spy(mockPostSvc, 'create');
  $scope.post = {body: 'my new post'};
  $scope.addPost();
  expect(mochPostsSvc.create).to.have.been.calledWith({body: 'my new post'});
 });
});
