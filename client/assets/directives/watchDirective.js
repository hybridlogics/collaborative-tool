app.directive('watchDirective', WatchDirective)

function WatchDirective() {
    return {
        restrict: "A",
        link: function (scope, element) {
            // get canvas context
            var ctx1 = element[0].getContext('2d');
            // capture drawing modus
            var isDrawing = false;
            // last mouse coordinates
            var lastMouse1 = {
                x: 0,
                y: 0
            }
            var background = new Image();

            scope.$watch("imageLink", function (val) {
                background.src = val;
                background.onload = function () {
                    ctx1.drawImage(background, 0, 0, 900, 500);
                }
            });

            // mouse down handler
            element.bind('mousedown', function (event) {
                if (scope.pen || scope.eraser) {
                    // save last mouse position
                    lastMouse1.x = event.offsetX;
                    lastMouse1.y = event.offsetY;

                    // begins new line
                    ctx1.beginPath();
                    // set is drawing
                    isDrawing = true;

                    scope.start(lastMouse1.x, lastMouse1.y, isDrawing, 'mousedown', background.src, 2);
                }
            });

            // mouse move handler
            element.bind('mousemove', function (event) {
                if (isDrawing && scope.pen) {
                    // draw
                    ctx1.moveTo(lastMouse1.x, lastMouse1.y);
                    ctx1.lineTo(event.offsetX, event.offsetY);
                    ctx1.strokeStyle = "red";
                    ctx1.stroke();
                    // save last mouse
                    lastMouse1.x = event.offsetX;
                    lastMouse1.y = event.offsetY;

                    scope.start(lastMouse1.x, lastMouse1.y, isDrawing, 'mousemove', background.src, 2);
                } else if (isDrawing && scope.eraser) {
                    ctx1.clearRect(0, 0, 900, 500);
                    ctx1.drawImage(background, 0, 0, 900, 500);
                    scope.start(lastMouse1.x, lastMouse1.y, isDrawing, 'mouseerase', background.src, 2);
                }

            });

            // mouse up handler
            element.bind('mouseup', function (event) {
                if (scope.pen || scope.eraser) {
                    isDrawing = false;
                    scope.start(lastMouse.x, lastMouse.y, isDrawing, 'mouseup', background.src, 2);
                }
            });

            // capture drawing modus
            scope.$watch("obj", function (val) {

                if (val.event == 'mouseerase') {
                    ctx1.clearRect(0, 0, 900, 500);
                    ctx1.drawImage(background, 0, 0, 900, 500);
                }

                if (val.event == 'mousedown' && val.source == 1) {
                    lastMouse1.x = val.x;
                    lastMouse1.y = val.y;

                    ctx1.beginPath();
                }

                if (val.event == 'mousemove' && val.source == 1) {
                    if (val.mouse) {
                        ctx1.moveTo(lastMouse1.x, lastMouse1.y);
                        ctx1.lineTo(val.x, val.y);
                        ctx1.strokeStyle = "blue";
                        ctx1.stroke();
                        lastMouse1.x = val.x;
                        lastMouse1.y = val.y;
                    }
                }

            });

        }
    };
};
