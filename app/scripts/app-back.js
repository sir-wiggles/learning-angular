'use strict';

angular.module('confusionApp', [])
	.controller('menuController', function() {

		this.tab = 1;
		this.filtText = '';

		 var dishes = [
			 {
			   name:'Uthapizza',
			   image: 'images/uthapizza.png',
			   category: 'mains',
			   label:'Hot',
			   price:'4.99',
			   description:'A unique combination of Indian Uthappam (pancake) and Italian pizza, topped with Cerignola olives, ripe vine cherry tomatoes, Vidalia onion, Guntur chillies and Buffalo Paneer.',
			   comment: ''
			},
			{
			   name:'Zucchipakoda',
			   image: 'images/zucchipakoda.png',
			   category: 'appetizer',
			   label:'',
			   price:'1.99',
			   description:'Deep fried Zucchini coated with mildly spiced Chickpea flour batter accompanied with a sweet-tangy tamarind sauce',
			   comment: ''
			},
			{
			   name:'Vadonut',
			   image: 'images/vadonut.png',
			   category: 'appetizer',
			   label:'New',
			   price:'1.99',
			   description:'A quintessential ConFusion experience, is it a vada or is it a donut?',
			   comment: ''
			},
			{
			   name:'ElaiCheese Cake',
			   image: 'images/elaicheesecake.png',
			   category: 'desserts',
			   label:'',
			   price:'2.99',
			   description:'A delectable, semi-sweet New York Style Cheese Cake, with Graham cracker crust and spiced with Indian cardamoms',
			   comment: ''
			}
		];

		this.dishes = dishes;

		this.select = function(tab) {
			this.tab = tab;

			if (tab === 2) {
				this.filtText = "appetizer";
			}
			else if (tab === 3) {
				this.filtText = "mains";
			}
			else if (tab === 4) {
				this.filtText = "desserts";
			}
			else {
				this.filtText = '';
			}
		};

		this.isSelected = function(tab) {
			return (this.tab === tab);
		};

	})
	.controller("ContactController", ['$scope', function($scope){
		$scope.feedback = {
			mychannel: "",
			firstname: "",
			lastname: "",
			agree: false,
			email: "",
			tel: {
				areaCode: "",
				number: "",
			},
		};
		var channels = [{value: "tel", label:"Tel."}, {value:"Email", label:"Email"}];
		$scope.channels = channels;
		$scope.invalidChannelSelection = false;
	}])
	.controller("FeedbackController", ['$scope', function($scope){
		$scope.sendFeedback = function() {
			console.log($scope.feedback);
			if ($scope.feedback.agree && ($scope.feedback.mychannel == "")){
				$scope.invalidChannelSelection = true;
				console.log('incorrect');
			} else {
				$scope.invalidChannelSelection = false;
				$scope.feedback = {
					mychannel:"",
					firstname:"",
					lastname:"",
					agree: false,
					email: "",
					tel: {
						areaCode: "",
						number: "",
					}
				};
				$scope.feedbackForm.$setPristine();
				console.log($scope.feedback);
			}
		};
	}])
	.controller("DishCommentController", ['$scope', function($scope) {
            //Step 1: Create a JavaScript object to hold the comment from the form

		$scope.preview = false;
		$scope.commentFeedback = {
			author: "",
			rating: 5,
			comment: "",
			date: "",
		};

		$scope.$watch("commentFeedback.comment", function(){
			console.log("watch")
			if (typeof $scope.commentFeedback.comment === 'undefined') {
				$scope.preview = false;
				return
			}
			if ($scope.commentFeedback.comment.length > 0) {
				$scope.preview = true;
			} else {
				$scope.preview = false;
			}
		});

            $scope.submitComment = function () {

		    console.log($scope.commentFeedback);
			var date = new Date().toISOString();
			$scope.commentFeedback.date = date
			var newObj = JSON.parse(JSON.stringify($scope.commentFeedback));
			$scope.dish.comments.push(newObj);
			$scope.commentFeedback = {
				author: "",
				rating: 5,
				comment: "",
				date: "",
			};
			$scope.comment.author.$setPristine(true);
			$scope.comment.comment.$setPristine(true);

                //Step 2: This is how you record the date
                // "The date property of your JavaScript object holding the comment" = new Date().toISOString();

                // Step 3: Push your comment into the dish's comment array
                // $scope.dish.comments.push("Your JavaScript Object holding the comment");

                //Step 4: reset your form to pristine

                //Step 5: reset your JavaScript object that holds your comment
            };
	}])
        .controller('dishDetailController', ['$scope', function($scope) {
           $scope.sortbyVal = "";
           $scope.dish={
                     name:'Uthapizza',
                     image: 'images/uthapizza.png',
                     category: 'mains',
                     label:'Hot',
                     price:'4.99',
                     description:'A unique combination of Indian Uthappam (pancake) and Italian pizza, topped with Cerignola olives, ripe vine cherry tomatoes, Vidalia onion, Guntur chillies and Buffalo Paneer.',
                     comments: [
                          {
                              rating:5,
                              comment:"Imagine all the eatables, living in conFusion!",
                              author:"John Lemon",
                              date:"2012-10-16T17:57:28.556094Z"
                          },
                          {
                              rating:4,
                              comment:"Sends anyone to heaven, I wish I could get my mother-in-law to eat it!",
                              author:"Paul McVites",
                              date:"2014-09-05T17:57:28.556094Z"
                          },
                          {
                              rating:3,
                              comment:"Eat it, just eat it!",
                              author:"Michael Jaikishan",
                              date:"2015-02-13T17:57:28.556094Z"
                          },
                          {
                              rating:4,
                              comment:"Ultimate, Reaching for the stars!",
                              author:"Ringo Starry",
                              date:"2013-12-02T17:57:28.556094Z"
                          },
                          {
                              rating:2,
                              comment:"It's your birthday, we're gonna party!",
                              author:"25 Cent",
                              date:"2011-12-02T17:57:28.556094Z"
                          },
                      ]
               };
	}]);
