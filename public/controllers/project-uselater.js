/* 
	project.js
	Create new project 

	Revision history
	Pranav Maharaj, 2014.06.23: created
 */
 app.controller('ProjectController', [ 'Project', 'geolocation', '$scope', '$location', '$rootScope', '$alert', 
 		function (Project, geolocation, $scope, $location, $rootScope, $alert) {
			
 			$rootScope.pageTitle = "New Project"
			//Input Design Data
			// $scope.lineVoltage = 11;
			// $scope.impedanceOne = 11;
			// $scope.impedanceTwo = 11;
			// $scope.impedanceThree	= 11;
			
			// $scope.decrementFactor = 11;
			// $scope.growthFactor = 11;
			// $scope.physicalGridCoefficient = 11;
			// $scope.irregularityFactor = 11;
			
			// $scope.averageResistivity = 11;
			// $scope.immediateResistivity = 11;
			// $scope.clearingTime = 11;
			// $scope.substationLength = 11;
			// $scope.substationWidth = 11;
			// $scope.widthSpacing = 11;
			// $scope.lengthSpacing = 11;
			// $scope.earthRodLength = 11;
			// $scope.geometricSpacingFactor = 11;

 			$scope.formData = {};
 			
 			
		$scope.processForm = function() {
			console.log('Construction data genereated');

			// Input Design Data
			
			$scope.projectName = $scope.formData.projectName;
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
			$scope.recommendation = "Increase rods by 10% to: " + $scope.CalculateIncreasedEarthRodsNumber().toFixed(3);
			
			$scope.newGridConductorLength = $scope.increasedEarthRodsNumber * $scope.earthRodLength;
			$scope.totalLengthOfCopper = $scope.gridConductorLength + $scope.newGridConductorLength;
			$scope.maxStepVoltage = $scope.CalculateMaximumStepVoltage().toFixed(3);
			$scope.tolerableStepVoltage = $scope.CalculateTolerableStepVoltage().toFixed(3);
			
			$scope.designGrade ="";
			$scope.comments = "";
			$scope.CompareMaxWithTolerableStepVoltage();
			
			$scope.maxGridPotentialRise = $scope.CalculateMaxGridPotentialRise().toFixed(3);
			
			$location.path('/form/designGrade');
		}
		
	//Comparing max step voltage and tolerable step voltage
	$scope.CompareMaxWithTolerableStepVoltage = function()
	{
		if($scope.maxStepVoltage <= $scope.tolerableStepVoltage)
		{
			$scope.designGrade = "Good";			
			$scope.comments = "None";
		}
		else
		{
			$scope.designGrade = "Bad"; 
			$scope.comments = "Revise conductor-length input"; 
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

	$scope.createProject = function() {
		
		// $scope.latitude = $scope.coords.latitude || 0;
		// $scope.longitude = $scope.coords.longitude || 0;

		Project.save({
    
	    name: $scope.projectName || "New Project 1", // ideally the default should be something with a date/time stamp
	    
	    latitude: $scope.latitude,
	    longitude: $scope.longitude, 

	    lineVoltage: $scope.lineVoltage,
	    impedanceOne: $scope.impedanceOne,
	    impedanceTwo: $scope.impedanceTwo,
	    impedanceThree: $scope.impedanceThree,
	    
	    decrementFactor: $scope.decrementFactor,
	    growthFactor: $scope.growthFactor,
	    physicalGridCoefficient: $scope.physicalGridCoefficient,
	    irregularityFactor: $scope.irregularityFactor,
	    
	    averageResistivity: $scope.averageResistivity,
	    immediateResistivity: $scope.immediateResistivity,
	    clearingTime: $scope.clearingTime,
	    substationLength: $scope.substationLength,
	    substationWidth: $scope.substationWidth,
	    widthSpacing: $scope.widthSpacing,
	    lengthSpacing: $scope.lengthSpacing,
	    earthRodLength: $scope.earthRodLength,
	    geometricSpacingFactor: $scope.geometricSpacingFactor,
	    
	    estimatedFaultCurrent: $scope.estimatedFaultCurrent,
	    designFaultCurrent: $scope.designFaultCurrent,
	    conductorLength: $scope.conductorLength,
	    earthMatResistance: $scope.earthMatResistance,
	    gridConductorLength: $scope.gridConductorLength,
	    minEarthRodsNumber: $scope.minEarthRodsNumber,
	    increasedEarthRodsNumber: $scope.increasedEarthRodsNumber,
	    newGridConductorLength: $scope.newGridConductorLength,
	    totalLengthOfCopper: $scope.totalLengthOfCopper,
	    maxStepVoltage: $scope.maxStepVoltage,
	    tolerableStepVoltage: $scope.tolerableStepVoltage,
	    designGrade: $scope.designGrade,
	    maxGridPotentialRise: $scope.maxGridPotentialRise,
	    recommendation: $scope.recommendation,
	    comments: $scope.comments,
	  }, 
		function() {
			console.log("Created Project");
			$alert({
        title: 'Success!',
        content: 'Project saved.',
        placement: 'top-right',
        type: 'success',
        duration: 3
      });
		},
		function(response) {
			console.log(response.data.message);
			$alert({
        title: 'Error!',
        content: response.data.message,
        placement: 'top-right',
        type: 'danger',
        duration: 3   
      });
	  });
	};

	$rootScope.pageTitle = "Projects"
	$scope.show = true;
	$scope.projects =  Project.query({
		isArray: true
	},
	function(data) {
		console.log(data);
	},
	function(response) {
		$alert({
      title: 'Error!',
      content: response.data,
      placement: 'top-right',
      type: 'danger',
      duration: 3   
    });
	});

	$scope.remove = function(id, index) {
		Project.remove({id: id}, function() {
			$scope.projects.splice(index, 1);

			//TODO =====
			// Feedback user about current deletion
		});
	}

	$scope.viewProject = function(id, index) {
		console.log("view clicked " + id + " Index: " + index)
	}

	$scope.editProject = function(id, index) {
		console.log("Edit clicked " + id + "  index: " + index)

		$scope.formData = $scope.projects[index];

		console.log($scope.projects[index]);
		$scope.currentProject = $scope.projects[index];
		$scope.formData.projectName = "Hemanth";
		
		$location.path('/form/electrical');
	} 

	$scope.getCurrentGeoLocation = function() {
		console.log("Geoloaction")
		geolocation.getLocation().then(function(data){
      $scope.coords = {latitude:data.coords.latitude, longitude:data.coords.longitude};
    	$scope.latitude = data.latitude;
    	$scope.longitude = data.longitude;
    });
	}

}]);

