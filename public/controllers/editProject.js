/* 
	editProject.js
	Edit project controller 

	Revision history
	Hemanth Kona, 2014.06.23: created
 */
 app.controller('EditProjectController', [ 'Project', 'geolocation', '$scope', '$rootScope', '$location', '$window', '$alert', '$modal', '$stateParams',  
 	function(Project, geolocation, $scope, $rootScope, $location, $window, $alert, $modal, $stateParams) {
 		$rootScope.pageTitle = "Edit Project"
 		$scope.show = true;
 		$scope.parent = "edit";
 		$scope.showResult = true;
 		$scope.showGeoLocation = false;

 		if($rootScope.currentProject == null) {
 			console.log("not project ");
 			$rootScope.currentProject = Project.get({id: $stateParams.projectId}, 
 				function(data) {
 					console.log(data);
 				},
 				function(respone) {
 					console.log(respone);
 				}
 			);
 		}

 		// Warns user of data loss, when page is refreshed
 		$window.onbeforeunload = function() {
		  return "Data will be lost if you leave the page!";
		};
		
		//console.log(data in $rootScope.currentProject); 		
 		// if ((typeof $rootScope.currentProject.geoloc == undefined)) {
 		// 	console.log(true);
 		// 	$scope.formData.latitude = $rootScope.currentProject.geoloc.latitude
 		// 	$scope.formData.longitude = $rootScope.currentProject.geoloc.longitude
 		// }
 		// else {
 		// 	console.log(false);
 		// }

 		$scope.formData = {
 			projectName: $rootScope.currentProject.name || new Date().toUTCString(),


	    lineVoltage: $rootScope.currentProject.data.design.lineVoltage,
	    impedanceOne: $rootScope.currentProject.data.design.impedanceOne,
	    impedanceTwo: $rootScope.currentProject.data.design.impedanceTwo,
	    impedanceThree: $rootScope.currentProject.data.design.impedanceThree,
	    
	    decrementFactor: $rootScope.currentProject.data.design.decrementFactor,
	    growthFactor: $rootScope.currentProject.data.design.growthFactor,
	    physicalGridCoefficient: $rootScope.currentProject.data.design.physicalGridCoefficient,
	    irregularityFactor: $rootScope.currentProject.data.design.irregularityFactor,
	    
	    averageResistivity: $rootScope.currentProject.data.design.averageResistivity,
	    immediateResistivity: $rootScope.currentProject.data.design.immediateResistivity,
	    clearingTime: $rootScope.currentProject.data.design.clearingTime,
	    substationLength: $rootScope.currentProject.data.design.substationLength,
	    substationWidth: $rootScope.currentProject.data.design.substationWidth,
	    widthSpacing: $rootScope.currentProject.data.design.widthSpacing,
	    lengthSpacing: $rootScope.currentProject.data.design.lengthSpacing,
	    earthRodLength: $rootScope.currentProject.data.design.earthRodLength,
	    geometricSpacingFactor: $rootScope.currentProject.data.design.geometricSpacingFactor,
	    
		//Output construction data
	    estimatedFaultCurrent: $rootScope.currentProject.data.construction.estimatedFaultCurrent,
	    designFaultCurrent: $rootScope.currentProject.data.construction.designFaultCurrent,
	    conductorLength: $rootScope.currentProject.data.construction.conductorLength,
	    earthMatResistance: $rootScope.currentProject.data.construction.earthMatResistance,
	    gridConductorLength: $rootScope.currentProject.data.construction.gridConductorLength,
	    minEarthRodsNumber: $rootScope.currentProject.data.construction.minEarthRodsNumber,
	    increasedEarthRodsNumber: $rootScope.currentProject.data.construction.increasedEarthRodsNumber,
	    newGridConductorLength: $rootScope.currentProject.data.construction.newGridConductorLength,
	    totalLengthOfCopper: $rootScope.currentProject.data.construction.totalLengthOfCopper,
	    maxStepVoltage: $rootScope.currentProject.data.construction.maxStepVoltage,
	    tolerableStepVoltage: $rootScope.currentProject.data.construction.tolerableStepVoltage,
	    designGrade: $rootScope.currentProject.data.construction.designGrade,
	    maxGridPotentialRise: $rootScope.currentProject.data.construction.maxGridPotentialRise,
	    recommendation: $rootScope.currentProject.data.construction.recommendation,
	    comments: $rootScope.currentProject.data.construction.comments,

		
		//visual analytics
		totalVoltage: $rootScope.currentProject.data.construction.totalVoltage,
		maxStepVoltagePercent: $rootScope.currentProject.data.construction.maxStepVoltagePercent,
		tolerableStepVoltagePercent: $rootScope.currentProject.data.construction.tolerableStepVoltagePercent, 
		
 		};

 		$scope.createProject = function() {
 				

 			Project.update({id: $rootScope.currentProject._id}, $scope.formData,
 				function() {
	 				$alert({
		        title: 'Success!',
		        content: 'Project updated.',
		        placement: 'top-right',
		        type: 'success',
		        duration: 3
      		});
 				},
 				function(response) {
 					console.log(response.data.message)
 					$alert({
		        title: 'Error!',
		        content: response.data.message,
		        placement: 'top-right',
		        type: 'danger',
		        duration: 5  
		      });
	      	
 				});
 			console.log("updated");
 		};

 		$scope.processForm = function() {
			console.log('Construction data genereated');

			$scope.formErrors = [];
			

			if($scope.formData.lineVoltage == undefined) {
				$scope.formErrors.push('Line Voltage');
			}

			if($scope.formData.impedanceOne == undefined) {
				$scope.formErrors.push('Impedance One');
			}

			if($scope.formData.impedanceTwo == undefined) {
				$scope.formErrors.push('Impedance Two');
			}

			if($scope.formData.impedanceThree == undefined) {
				$scope.formErrors.push('Impedance Three');
			}

			if($scope.formData.decrementFactor == undefined) {
				$scope.formErrors.push('Decrement Factor');
			}

			if($scope.formData.growthFactor == undefined) {
				$scope.formErrors.push('Growth Factor');
			}

			if($scope.formData.physicalGridCoefficient == undefined) {
				$scope.formErrors.push('Physical Grid Coefficient');
			}

			if($scope.formData.irregularityFactor == undefined) {
				$scope.formErrors.push('Irregularity Factor');
			}

			if($scope.formData.averageResistivity == undefined) {
				$scope.formErrors.push('Average Resistivity');
			}

			if($scope.formData.immediateResistivity == undefined) {
				$scope.formErrors.push('Immediate Resistivity');
			}

			if($scope.formData.clearingTime == undefined) {
				$scope.formErrors.push('Clearing Time');
			}

			if($scope.formData.substationLength == undefined) {
				$scope.formErrors.push('Substation Length');
			}

			if($scope.formData.substationWidth == undefined) {
				$scope.formErrors.push('Substation Width');
			}

			if($scope.formData.widthSpacing == undefined) {
				$scope.formErrors.push('Width Spacing');
			}

			if($scope.formData.lengthSpacing == undefined) {
				$scope.formErrors.push('Length Spacing');
			}

			if($scope.formData.earthRodLength == undefined) {
				$scope.formErrors.push('Earth Rod Length');
			}

			if($scope.formData.geometricSpacingFactor == undefined) {
				$scope.formErrors.push('Geometric Spacing Factor');
			}

			if($scope.formErrors.length != 0) {
				
				// Concatenating all the data in the array to form a string, that string is sent to content in $modal
				$scope.AllErrors = $scope.formErrors.join(', <br>')

				// Pop up or Modal to show the error list
				$modal({
					title: "Error: Missing Input Data",
					backdrop: false,
					html: true,
					content: $scope.AllErrors
				});

				return;
			}

			// Input Design Data
			
			$scope.lineVoltage = parseFloat($scope.formData.lineVoltage);
    	
	    $scope.impedanceOne = parseFloat($scope.formData.impedanceOne);
	    $scope.impedanceTwo = parseFloat($scope.formData.impedanceTwo);
	    $scope.impedanceThree   = parseFloat($scope.formData.impedanceThree);
	    
	    $scope.decrementFactor = parseFloat($scope.formData.decrementFactor);
	    $scope.growthFactor = parseFloat($scope.formData.growthFactor);
	    $scope.physicalGridCoefficient = parseFloat($scope.formData.physicalGridCoefficient);
	    $scope.irregularityFactor = parseFloat($scope.formData.irregularityFactor);
	    
	    $scope.averageResistivity = parseFloat($scope.formData.averageResistivity);
	    $scope.immediateResistivity = parseFloat($scope.formData.immediateResistivity);
	    $scope.clearingTime = parseFloat($scope.formData.clearingTime);
	    $scope.substationLength = parseFloat($scope.formData.substationLength);
	    $scope.substationWidth = parseFloat($scope.formData.substationWidth);
	    $scope.widthSpacing = parseFloat($scope.formData.widthSpacing);
	    $scope.lengthSpacing = parseFloat($scope.formData.lengthSpacing);
	    $scope.earthRodLength = parseFloat($scope.formData.earthRodLength);
	    $scope.geometricSpacingFactor = parseFloat($scope.formData.geometricSpacingFactor);
			
			//Output Construction Data
			
			$scope.estimatedFaultCurrent = $scope.CalculateEstimatedFaultCurrent().toFixed(3);
			$scope.designFaultCurrent = $scope.CalculateDesignFaultCurrent().toFixed(3);
			
			$scope.conductorLength = $scope.CalculateConductorLength().toFixed(3);
			$scope.earthMatResistance = $scope.CalculateEarthMatResistance().toFixed(3);
			$scope.gridConductorLength = $scope.CalculateGridConductorLength().toFixed(3);
			$scope.minEarthRodsNumber = $scope.CalculateMinEarthRodsNumber().toFixed(3);
			$scope.increasedEarthRodsNumber = $scope.CalculateIncreasedEarthRodsNumber().toFixed(3);
			$scope.comments = "Increased rod amount by 10% to: " + $scope.CalculateIncreasedEarthRodsNumber().toFixed(3);
			
			$scope.newGridConductorLength = parseFloat($scope.increasedEarthRodsNumber * $scope.earthRodLength).toFixed(3);
			$scope.totalLengthOfCopper = parseFloat($scope.gridConductorLength) + parseFloat($scope.newGridConductorLength);
			$scope.maxStepVoltage = $scope.CalculateMaximumStepVoltage().toFixed(3);
			$scope.tolerableStepVoltage = $scope.CalculateTolerableStepVoltage().toFixed(3);
			
			
			
			$scope.designGrade ="";
			$scope.recommendation = "";
			$scope.CompareMaxWithTolerableStepVoltage();
			
			$scope.maxGridPotentialRise = $scope.CalculateMaxGridPotentialRise().toFixed(3);
			
			$scope.totalVoltage = parseFloat($scope.maxStepVoltage) + parseFloat($scope.tolerableStepVoltage);
			
			$scope.maxStepVoltagePercent = (($scope.maxStepVoltage / $scope.totalVoltage) * 100).toFixed(0);
			
			$scope.tolerableStepVoltagePercent = (($scope.tolerableStepVoltage / $scope.totalVoltage) * 100).toFixed(0);

			// Converting to form data for convenience 
			//Eliminating past redundancy and overcalculations with more sources of error - pranav

			$scope.formData.estimatedFaultCurrent = $scope.estimatedFaultCurrent;
			$scope.formData.designFaultCurrent = $scope.designFaultCurrent;
			
			$scope.formData.conductorLength = $scope.conductorLength;
			$scope.formData.earthMatResistance = $scope.earthMatResistance;
			$scope.formData.gridConductorLength = $scope.gridConductorLength;
			$scope.formData.minEarthRodsNumber = $scope.minEarthRodsNumber ;
			$scope.formData.increasedEarthRodsNumber = $scope.increasedEarthRodsNumber;
			$scope.formData.comments = $scope.comments
			
			$scope.formData.newGridConductorLength = $scope.newGridConductorLength;
			$scope.formData.totalLengthOfCopper = $scope.totalLengthOfCopper;
			$scope.formData.maxStepVoltage = $scope.maxStepVoltage;
			$scope.formData.tolerableStepVoltage = $scope.tolerableStepVoltage;
		
			
		
			
			$scope.formData.designGrade =$scope.designGrade;
			$scope.formData.recommendation= $scope.recommendation;
			//$scope.CompareMaxWithTolerableStepVoltage(); ALREADY DONE ABOVE

			$scope.formData.maxGridPotentialRise = $scope.maxGridPotentialRise;
			$scope.formData.totalVoltage = $scope.totalVoltage;
			
			$scope.formData.maxStepVoltagePercent = $scope.maxStepVoltagePercent;
			$scope.formData.tolerableStepVoltagePercent = $scope.tolerableStepVoltagePercent;

			$location.path('/edit/designGrade/');
		}
		
	//Comparing max step voltage and tolerable step voltage
	$scope.CompareMaxWithTolerableStepVoltage = function()
	{
		if(($scope.maxStepVoltage <= $scope.tolerableStepVoltage)&&($scope.maxStepVoltage > 0) && ($scope.minEarthRodsNumber > 0))
		{
			$scope.designGrade = "Good";			
			$scope.formData.designGrade = "Good";		
			
			$scope.comments = "Max Step < Tolerable Step Voltage. \n" + $scope.comments ;	
			$scope.formData.comments = $scope.comments ;
				
				
			$scope.recommendation = "None";
			$scope.formData.recommendation = "None";
		}
		else if (($scope.maxStepVoltage > $scope.tolerableStepVoltage) && ($scope.minEarthRodsNumber > 0))
		{
			//one for back end one for front end
			$scope.designGrade = "Bad"; 
			$scope.formData.designGrade = "Bad"; 
		
			$scope.comments = "Max Step > Tolerable Step Voltage. ";
			$scope.formData.comments = $scope.comments ;
			
			$scope.recommendation = "Revise conductor-length inputs, check factors and coefficients for possible errors";
			$scope.formData.recommendation = "Revise conductor-length inputs, check factors and coefficients for possible errors";
		}
		else if (($scope.maxStepVoltage <= $scope.tolerableStepVoltage) && ($scope.minEarthRodsNumber <= 0))
		{
			$scope.designGrade = "Bad"; 
			$scope.formData.designGrade = "Bad"; 
			
			$scope.comments = "Calculated # of rods is negative. " ;
			$scope.formData.comments = $scope.comments ;
			
			$scope.recommendation = "Revise conductor-length inputs, check factors and coefficients for possible errors";
			$scope.formData.recommendation = "Revise conductor-length inputs, check factors and coefficients for possible errors";
		}
		else if (($scope.maxStepVoltage > $scope.tolerableStepVoltage) && ($scope.minEarthRodsNumber > 0))
		{
			$scope.designGrade = "Bad"; 
			$scope.formData.designGrade = "Bad"; 
				
				
			$scope.comments = "Max Step > Tolerable Step Voltage. " + '\n' +
				"Calculated # of rods is negative";		
			
			$scope.formData.comments = $scope.comments ;
				
			$scope.recommendation = "Revise conductor-length inputs, check factors and coefficients for possible errors";
			$scope.formData.recommendation = "Revise conductor-length inputs, check factors and coefficients for possible errors";
		}
		else if (($scope.maxStepVoltage < 0) && ($scope.minEarthRodsNumber > 0))
		{
			$scope.designGrade = "Bad"; 
			$scope.formData.designGrade = "Bad"; 
				
				
			$scope.comments = "Max Step Voltage is Negative. ";		
			
			$scope.formData.comments = $scope.comments ;
				
			$scope.recommendation = "Revise conductor-length inputs, check factors and coefficients for possible errors";
			$scope.formData.recommendation = "Revise conductor-length inputs, check factors and coefficients for possible errors";
		}
		else if (($scope.maxStepVoltage < 0 ) && ($scope.minEarthRodsNumber <= 0))
		{
			$scope.designGrade = "Bad"; 
			$scope.formData.designGrade = "Bad"; 
				
				
			$scope.comments = "Max Step Voltage is Negative. " + '\n' +
				"Calculated # of rods is negative";		
			
			$scope.formData.comments = $scope.comments ;
				
			$scope.recommendation = "Revise conductor-length inputs, check factors and coefficients for possible errors";
			$scope.formData.recommendation = "Revise conductor-length inputs, check factors and coefficients for possible errors";
		}
		else if (($scope.maxStepVoltage > $scope.tolerableStepVoltage) && ($scope.minEarthRodsNumber <= 0))
		{
			$scope.designGrade = "Bad"; 
			$scope.formData.designGrade = "Bad"; 
				
				
			$scope.comments = "Max Step > Tolerable Step Voltage.  " + '\n' +
				"Calculated # of rods is negative";		
			
			$scope.formData.comments = $scope.comments ;
				
			$scope.recommendation = "Revise conductor-length inputs, check factors and coefficients for possible errors";
			$scope.formData.recommendation = "Revise conductor-length inputs, check factors and coefficients for possible errors";
		}
		
		
	}
	
	//Estimated Fault Current
	$scope.CalculateEstimatedFaultCurrent = function()
	{
		return ((3*($scope.lineVoltage/Math.sqrt(3)))/($scope.impedanceOne + $scope.impedanceTwo + $scope.impedanceThree));
	}
	
	//Design Fault Current
	$scope.CalculateDesignFaultCurrent = function()
	{
		return $scope.estimatedFaultCurrent * $scope.decrementFactor * $scope.growthFactor;
	}
	
	//Conductor Length
	$scope.CalculateConductorLength = function()
	{
		return (($scope.physicalGridCoefficient * $scope.irregularityFactor * 
			$scope.averageResistivity * $scope.designFaultCurrent * 
			Math.sqrt($scope.clearingTime))/(116 + (0.17 * $scope.immediateResistivity)));
	}
	
	//Overall Radius from Substation Area Info
	$scope.CalculateRadius = function()
	{
		return Math.sqrt(($scope.substationLength * $scope.substationWidth)/(Math.PI));
	}
	
	//Earth Mat Resistance
	$scope.CalculateEarthMatResistance = function()
	{
		return $scope.averageResistivity * ((1/(4 * $scope.CalculateRadius())) + (1/$scope.conductorLength));
	}
	
	//Grid Conductor length
	$scope.CalculateGridConductorLength = function()
	{
		return ($scope.substationWidth
			* (($scope.substationLength / $scope.lengthSpacing) + 1))
			+ ($scope.substationLength * (($scope.substationWidth / $scope.widthSpacing) + 1));
	}
	
	//Minimum Required number of Earth Rods
	$scope.CalculateMinEarthRodsNumber = function()
	{
		return Math.round(($scope.conductorLength - $scope.gridConductorLength) / $scope.earthRodLength);
	}
	///////////////////////////////////////////////////////////////////////////////	
	//Method: Calculate earth rod increase
	$scope.CalculateIncreasedEarthRodsNumber = function()
	{
		return Math.round($scope.minEarthRodsNumber * 1.10);
	}
	
	//Method: Calculate maximum step voltage
	$scope.CalculateMaximumStepVoltage = function()
	{
		return $scope.geometricSpacingFactor * $scope.irregularityFactor * $scope.averageResistivity * ($scope.designFaultCurrent / $scope.totalLengthOfCopper);
	}
	
	//Method: Calculate tolerable step voltage
	$scope.CalculateTolerableStepVoltage = function()
	{
		return ((116 + (0.7 * $scope.immediateResistivity)) / (Math.sqrt($scope.clearingTime)));
	}
	
	//Method: Calculate maximum grid potential rise
	$scope.CalculateMaxGridPotentialRise = function()
	{
		return $scope.designFaultCurrent * $scope.earthMatResistance;
	}

	$scope.getCurrentGeoLocation = function() {
		console.log("Geoloaction")
		geolocation.getLocation().then(function(data){

			console.log(data);
      //$scope.coords = {latitude:data.coords.latitude, longitude:data.coords.longitude};
    	$scope.formData.latitude = data.coords.latitude;
    	$scope.formData.longitude = data.coords.longitude;

    	$alert({
    		title: 'Success!',
        content: 'Location added.',
        placement: 'top-right',
        type: 'success',
        duration: 3
    	})

    });
	}

 }]);
