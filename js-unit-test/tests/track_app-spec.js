(function(){
	"use strict";

	describe('Application: track_app.js', function(){
		var $rootScope, scope, TrackCtrl, globalObj, element,
			testData = {track: "foo"},
			badData = {};

		beforeEach(module("drinks.directives", "drinks.constants"));

		beforeEach(inject(function (_TrackCtrl_) {
			TrackCtrl = _TrackCtrl_;
		}));

		describe("TrackCtrl Service", function(){
			beforeEach(inject(function ($rootScope, _globalObj_) {
				scope = $rootScope.$new();
				globalObj = _globalObj_;
				spyOn(analytics, "track");
				scope.$digest();
			}));

			it('should exist', function() {
			    expect(TrackCtrl).toBeDefined();
			});

			describe("the API", function(){
				it("should have a track method", function(){
					expect(TrackCtrl.track).toBeDefined();
				});

				describe("the track method", function(){
					it ("should call the analytics track method", function(){
						TrackCtrl.track(testData);
						expect(analytics.track).toHaveBeenCalledWith(testData.track, jasmine.any(Object));
					});

					it ("should thrown an error if no event is supplied", function(){
						expect(function(){TrackCtrl.track(badData)}).toThrowError("No tracking event is defined");
					});

					it ("should throw an error if not analytics engine is found", function(){
						analytics = null;
						expect(function(){TrackCtrl.track(testData)}).toThrowError("No analytics engine");
					});
				});
			});
		});

		describe("Track Directive", function(){

			beforeEach(inject(function(_$rootScope_, $compile){
				$rootScope = _$rootScope_;
				scope = $rootScope.$new();
				spyOn(TrackCtrl, "track");

				element = angular.element('<div track="trackEvent"></div');
				element = $compile(element)(scope);

				scope.$digest();
			}));

			it ("should add a click handler to the element", function(){
				element.trigger("click");
				expect(TrackCtrl.track).toHaveBeenCalledWith(jasmine.any(Object));
			});
		});

	});

})();
