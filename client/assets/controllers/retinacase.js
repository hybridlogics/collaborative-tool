app.controller('RetinaCtrl', ['$scope', '$state', 'createChangeStream', 'LiveSet', 'Background', 'XY', 'VidStats', function ($scope, $state, createChangeStream, LiveSet, Background, XY, VidStats) {

    var pauseOrPlayStatus = false;
    $scope.tab = 'private';
    $scope.pen = false;
    $scope.eraser = false;
    $scope.penColor = '0014ff';
    $scope.colorOptions = {
        round: false,
        alpha: false,
        disabled: [true, false],
        format: 'hex'
    };
    $scope.playerVars = {
        controls: 0,
        autoplay: 0
    };
    $scope.imageArray = [
        {
            'src': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Righ_eye_retina.jpg/1280px-Righ_eye_retina.jpg',
            'thumb': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Righ_eye_retina.jpg/1280px-Righ_eye_retina.jpg',
            'type': 'image'
        },
        {
            'src': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Fundus_photograph_of_normal_right_eye.jpg/220px-Fundus_photograph_of_normal_right_eye.jpg',
            'thumb': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Fundus_photograph_of_normal_right_eye.jpg/220px-Fundus_photograph_of_normal_right_eye.jpg',
            'type': 'image'
        },
        {
            'src': 'videos/small',
            'thumb': 'https://i.ytimg.com/vi/yzyphSTkW2U/maxresdefault.jpg',
            'type': 'video'
        },
        {
            'src': 'http://webvision.med.utah.edu/imageswv/Diabretina.jpeg',
            'thumb': 'http://webvision.med.utah.edu/imageswv/Diabretina.jpeg',
            'type': 'image'
        },
        {
            'src': 'https://thumbs.dreamstime.com/b/human-eye-anatomy-retina-detailed-illustration-37535344.jpg',
            'thumb': 'https://thumbs.dreamstime.com/b/human-eye-anatomy-retina-detailed-illustration-37535344.jpg',
            'type': 'image'
        }, {
            'src': 'https://webeye.ophth.uiowa.edu/eyeforum/cases-i/case74/Acquired-Toxoplasmosis-Retina_3.jpg',
            'thumb': 'https://webeye.ophth.uiowa.edu/eyeforum/cases-i/case74/Acquired-Toxoplasmosis-Retina_3.jpg',
            'type': 'image'
        },
        {
            'src': 'https://images.onhealth.com/images/slideshow/eye_diseases_and_cond_s6_retinal_detachment.jpg',
            'thumb': 'https://images.onhealth.com/images/slideshow/eye_diseases_and_cond_s6_retinal_detachment.jpg',
            'type': 'image'
        }
    ];

    var src = new EventSource('http://localhost:3000/api/Xies/change-stream');
    var changes = createChangeStream(src);

    changes.on('data', function (update) {

        if (update.data.type == 'canvas') {
            $scope.obj = update.data;
        } else if (update.data.type == 'video') {
            var result = document.getElementsByClassName("videoshow");
            var video = angular.element(result);
            if (update.data.status) {
                video[0].play();
            } else if (!update.data.status) {
                video[0].pause();
            }
        }

    });

    var srcBg = new EventSource('http://localhost:3000/api/Backgrounds/change-stream');
    var bgChanges = createChangeStream(srcBg);

    bgChanges.on('data', function (update) {
        $scope.imageLink = update.data.image;
        $scope.imageType = update.data.type;
        if (update.data.type == 'video') {
            $scope.pubprv('private');
        }
    });

    $scope.start = function (x, y, status, event, image, source, penColor) {
        XY.create({
            x: x,
            y: y,
            mouse: status,
            event: event,
            source: source,
            color: penColor,
            type: 'canvas'
        });
    };

    $scope.imageLink = $scope.imageArray[0].src;
    $scope.imageType = $scope.imageArray[0].type;
    $scope.flickityOptions = {
        cellSelector: '.carousel-cell',
        freeScroll: true,
        contain: true,
        setGallerySize: false,
        prevNextButtons: false,
        pageDots: false
    };

    $scope.setBackgroundImage = function (src, thumb, type) {
        $scope.imageLink = src;
        $scope.imageThumb = thumb;
        $scope.imageType = type;
        Background.create({
            image: src,
            thumb: thumb,
            type: type
        });
    };

    $scope.videoId = function (url) {
        return url;
    };

    $scope.pauseOrPlay = function (videoLink) {
        pauseOrPlayStatus = !pauseOrPlayStatus;

        XY.create({
            src: videoLink,
            status: pauseOrPlayStatus,
            type: 'video'
        });
    };

    $scope.pubprv = function (tabstatus) {
        $scope.tab = tabstatus;
        $scope.colorOptions.disabled = false;
        pauseOrPlayStatus = false;

        if (tabstatus == 'private') {
            $scope.pen = false;
            $scope.eraser = false;
            $scope.colorOptions.disabled = true;
        }
    };

    $scope.draw = function () {
        $scope.pen = true;
        $scope.eraser = false;
    };

    $scope.erase = function () {
        $scope.eraser = true;
        $scope.pen = false;
    };

}]);
