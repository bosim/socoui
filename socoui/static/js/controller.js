function durationToInt(text) {
    arr = text.split(':');
    hours = parseInt(arr[0]);
    minutes = parseInt(arr[1]);
    seconds = parseInt(arr[2]);
    return hours * 3600 + minutes * 60 + seconds;
}

var app = angular.module('socoui', []);

app.config(['$interpolateProvider', function($interpolateProvider) {
  $interpolateProvider.startSymbol('{[');
  $interpolateProvider.endSymbol(']}');
}]);


app.controller('controller', function($scope, $http, $interval) {
    $scope.getDevices = function() {
        $http.get('/devices').then(function(data) {
            $scope.devices = data.data.devices;
            $scope.selected_device = $scope.devices[0];
            $scope.selected_device.selected = true;
        });
    } 

    $scope.setSelectedDevice = function(device) {
        $scope.selected_device.selected = false;
        $scope.selected_device = device;
        $scope.selected_device.selected = true;
        $scope.apply();
    }

    $scope.play = function() {
        if(!$scope.selected_device) {
            return;
        }

        uri = '/device/' + $scope.selected_device.uid + '/play';
        $http.get(uri).then(function(data) {
            $scope.parseTrackData(data.data.current_track);
        });
    }

    $scope.playFromQueue = function(index) {
        if(!$scope.selected_device) {
            return;
        }

        uri = '/device/' + $scope.selected_device.uid + '/play_from_queue?index=' + index;
        $http.get(uri).then(function(data) {
            $scope.parseTrackData(data.data.current_track);
        });
    }

    $scope.stop = function() {
        if(!$scope.selected_device) {
            return;
        }

        uri = '/device/' + $scope.selected_device.uid + '/stop';
        $http.get(uri).then(function(data) {
            $scope.parseTrackData(data.data.current_track);
        });
    }

    $scope.pause = function() {
        if(!$scope.selected_device) {
            return;
        }

        uri = '/device/' + $scope.selected_device.uid + '/pause';
        $http.get(uri).then(function(data) {
            $scope.parseTrackData(data.data.current_track);
        });
    }

    $scope.previous = function() {
        if(!$scope.selected_device) {
            return;
        }

        uri = '/device/' + $scope.selected_device.uid + '/previous';
        $http.get(uri).then(function(data) {
            $scope.parseTrackData(data.data.current_track);
        });
    }

    $scope.next = function() {
        if(!$scope.selected_device) {
            return;
        }

        uri = '/device/' + $scope.selected_device.uid + '/next';
        $http.get(uri).then(function(data) {
            $scope.parseTrackData(data.data.current_track);
        });
    }

    $scope.refreshTrackData = function() {
        if(!$scope.selected_device) {
            return;
        }

        uri = '/device/' + $scope.selected_device.uid;
        $http.get(uri).then(function(data) {
            track = data.data.result.current_track;
            $scope.parseTrackData(track);
        });
    }

    $scope.getQueueData = function() {
        console.log('hest');
        uri = '/device/' + $scope.selected_device.uid + 
            '/queue?offset=' + $scope.queue_offset;
        $http.get(uri).then(function(data) {
            $scope.queue = data.data.result;
        });
    }

    $scope.parseTrackData = function(track) {
        $scope.track_album = track.album;
        $scope.track_artist = track.artist;
        $scope.track_title = track.title;
        $scope.track_duration = durationToInt(track.duration);
        $scope.track_position = durationToInt(track.position);
        $scope.track_index = track.playlist_position;

        $scope.updateProgress();

        queue_offset = Math.floor(track.playlist_position / 10) * 10;
        
        if(queue_offset !== $scope.queue_offset || 
           $scope.queue_offset === undefined) {
            console.log("Hurray");
            $scope.queue_offset = queue_offset;
            $scope.getQueueData();
        }
    }

    $scope.updateProgress = function() {
        $scope.track_progress = ($scope.track_position / $scope.track_duration) * 100;
    }

    $interval( function() {
        $scope.track_position = $scope.track_position + 1;
        $scope.updateProgress();
    }, 1000);

    $interval( function() { 
        $scope.refreshTrackData(); 
    }, 5000);

    $scope.load = function() {
        $scope.getDevices();
    }

});
