var count = document.getElementById('score');
var high1 = document.getElementById('high');
var count1 = 0;
var count2=0;
var high = 0;
// Enemies our player must avoid
var Enemy = function(x, y, fast) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started
  this.x = x;
  this.y = y;
  this.fast = fast;
  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  this.x = this.x + this.fast * dt;
  // console.log(this.x);
  if (this.x == 0) {
    this.x = 0;
    this.fast = 100 + Math.floor(Math.random() * 300);
  }
  if (this.x > 500) {
    this.x = 0;
    this.fast = 100 + Math.floor(Math.random() * 300);
  }
  if (this.x < player.x + 60 && this.x + 70 > player.x &&
    this.y + 40 > player.y && this.y < player.y + 40) {
    player.x = 200;
    player.y = 400;
    count1 = 0;
    count.innerHTML = count1;
    player.sprite = 'images/char-cat-girl.png';
  }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
// var count=0;
class Player {
  constructor(x, y, sprite) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-cat-girl.png';

  }
}
Player.prototype.update = function(dt) {}

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var enemyLocations = [60, 143, 226];
enemyLocations.map((positionY) => {
  var enemyItem = new Enemy(0, positionY, 150);
  allEnemies.push(enemyItem);
})
var player = new Player(200, 400);

Player.prototype.handleInput = function(key) {
  switch (key) {
    case 'left':
      this.x = this.x - 101;
      if (this.x < 0) {
        this.x = 0;
      }
      break;
    case 'right':
      this.x = this.x + 101;
      if (this.x > 404) {
        this.x = 404;
      }
      break;
    case 'up':
      this.y = this.y - 83;
      if (this.y <= -40) {
        count1 = count1 + 1;
        count.innerHTML = count1;
        if (high < count1) {
          high = count1;
          high1.innerHTML = high;
        }
        if(high==5&&count2==0)
        {
          Swal.fire({
            type: 'success',
            title: 'stage 1 completed',
            html: 'High-Score:'+high,
          })
          count1=0;
          high=0;
          high1.innerHTML=high;
          count2=count2+1;
          count.innerHTML = count1;
        }
        if(high==10&&count2==1)
        {
          Swal.fire({
            type: 'success',
            title: 'stage 2 completed',
            html: 'High-Score:'+high,
          })
          count1=0;
          count2=count2+1;
          count.innerHTML = count1;
          high=0;
          high1.innerHTML=high;
        }
        if(high==15&&count2==2)
        {
          Swal.fire({
            type: 'success',
            title: 'stage 3 completed',
            html: 'High-Score:'+high,
          }).then((result) => {
            if (result.value) {
              document.location.reload();
              count1=0;
              count.innerHTML = count1;
              high=0;
              high1.innerHTML=high;
            }
          });
        }

        this.y = 400;
        this.x = 15 + Math.floor(Math.random() * (490));
        // console.log(this.x);
        if (this.x >= 404) {
          this.x = 404;
          this.sprite = 'images/char-pink-girl.png';
        }
        if (this.x >= 303 && this.x < 403) {
          this.x = 303;
          this.sprite = 'images/char-boy.png';
        }
        if (this.x >= 202 && this.x < 302) {
          this.x = 202;
          this.sprite = 'images/char-horn-girl.png';
        }
        if (this.x >= 101 && this.x < 201) {
          this.x = 101;
          this.sprite = 'images/char-princess-girl.png';
        }
        if (this.x <= 100) {
          this.x = 0;
          this.sprite = 'images/char-cat-girl.png';
        }
      }
      break;
    case 'down':
      this.y = this.y + 83;
      if (this.y > 400) {
        this.y = 400;
      }
      break;
    default:

  }

}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
