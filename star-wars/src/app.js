jQuery(() => {

    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext("2d");
    document.body.appendChild(canvas);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    var SPEED = 40;
    var STAR_NUMBER = 250;
    var StarStream = Rx.Observable.range(1, STAR_NUMBER)
    .map(function() {
        return {
            x: parseInt(Math.random() * canvas.width),
            y: parseInt(Math.random() * canvas.height),
            size: Math.random() * 3 + 1
        };
    }).toArray().switchMap((starArray) => {
        return Rx.Observable.interval(SPEED).map(function() {
            starArray.forEach(function(star) {
                if (star.y >= canvas.height) {
                    star.y = 0; // Reset star to top of the screen
                }
                star.y += 3; // Move star
            });
            return starArray;
        });
    });

    // StarStream.subscribe((starsArray) => {
    //     paintStars(starsArray);
    // })

    function paintStars(stars) {
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#ffffff';
        stars.forEach(function(star) {
            ctx.fillRect(star.x, star.y, star.size, star.size);
        });
    }


    var HERO_Y = canvas.height - 30;
    var mouseMove = Rx.Observable.fromEvent(canvas, 'mousemove');

    var SpaceShip = mouseMove
    .map(function(event) {
        return {
            x: event.clientX,
            y: HERO_Y
        };
    })
    .startWith({
        x: canvas.width / 2,
        y: HERO_Y
    });

    

    function drawTriangle(x, y, width, color, direction) {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(x - width, y);
        ctx.lineTo(x, direction === 'up' ? y - width : y + width);
        ctx.lineTo(x + width, y);
        ctx.lineTo(x - width,y);
        ctx.fill();
    }

    function paintSpaceShip(obj) {
        drawTriangle(obj.x, obj.y, 20, '#ff0000', 'up');
    }

    function renderScene(actors) {
        paintStars(actors.stars);
        paintSpaceShip(actors.spaceship);
        paintEnemies(actors.enemies);
        paintHeroShots(actors.heroShots);
    }

    var ENEMY_FREQ = 1500;
    var Enemies = Rx.Observable.interval(ENEMY_FREQ)
    .scan((enemyArray) => {
        var enemy = {
            x: parseInt(Math.random() * canvas.width),
            y: -30,
        };
        enemyArray.push(enemy);
        return enemyArray;
    }, []);

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function paintEnemies(enemies) {
        enemies.forEach(function(enemy) {
            enemy.y += 5;
            enemy.x += getRandomInt(-5, 5);
            drawTriangle(enemy.x, enemy.y, 20, '#00ff00', 'down');
        });
    }

    var SHOOTING_SPEED = 15;
    function paintHeroShots(heroShots) {
        heroShots.forEach(function(shot) {
            shot.y -= SHOOTING_SPEED;
            drawTriangle(shot.x, shot.y, 5, '#ffff00', 'up');
        });
    }

    var playerFiring = Rx.Observable.fromEvent(canvas, 'click')
    .sample(200)
    .timestamp();


    var HeroShots = Rx.Observable
    .combineLatest(
        playerFiring,
        SpaceShip,
        function(shotEvents, spaceShip) {
            return { x: spaceShip.x, timestamp: shotEvents.timestamp,};
        })
    .distinctUntilChanged(function(shot) { return shot.timestamp; })
    .scan(function(shotArray, shot) {
        shotArray.push({x: shot.x, y: HERO_Y});
        return shotArray;
    }, []);


    var Game = Rx.Observable
    .combineLatest(
    StarStream, SpaceShip, Enemies, HeroShots,
    function(stars, spaceship, enemies, heroShots) {
        return { 
            stars: stars, 
            spaceship: spaceship, 
            enemies: enemies,
            heroShots: heroShots
        };
    }).sample(SPEED);


    Game.subscribe(renderScene);
    //SpaceShip.subscribe((obj) => paintSpaceShip(obj))

})