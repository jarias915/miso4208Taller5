function loadScript(callback) {
	var s = document.createElement('script');
	s.src = 'https://rawgithub.com/marmelab/gremlins.js/master/gremlins.min.js';
	if(s.addEventListener) { 
		s.addEventListener('load',callback,false);
	} else if(s.readyState) {
		s.onreadystatechange = callback
	}
	document.body.appendChild(s);
}

function unleashGremlins(ttl, callback) {
    function stop() {
        horde.stop();
        callback();
    }
    var horde = window.gremlins.createHorde();
	
	//Juan Carlos - Fills the search and department elements of the page
	horde.gremlin(gremlins.species.formFiller().canFillElement(function(element) { return true }));
	
	//Juan Carlos - Random clicks on all the page
	//horde.gremlin(gremlins.species.clicker().clickTypes(['click']));

	//Juan Carlos - Random clicks on all the page
	//horde.gremlin(gremlins.species.clicker().canClick(function(element) { return true }));
	
	//Juan Carlos - Clicks on link elements only
	horde.gremlin(gremlins.species.clicker().canClick((element) => {return element.tagName.toLowerCase()==='a';}));
	
	//Juan Carlos - Clicks on button elements only
	horde.gremlin(gremlins.species.clicker().canClick((element) => {return element.tagName.toLowerCase()==='button';}));
	
	//Juan Carlos - Sets the distribution so the click action gets the higher priority
	horde.strategy(gremlins.strategies.distribution()
		.delay(50)         //Delay in milliseconds between each wave
		.distribution([
		0.2,               //First gremlin - Total must equal 1
		0.4,               //Second gremlin (Click)
		0.4,               //Third gremlin (Click)
		])
	)
	
	horde.seed(1234);

    horde.after(callback);
    window.onbeforeunload = stop;
    setTimeout(stop, ttl);
    horde.unleash();
}

describe('Monkey testing with gremlins ', function () {
  
  it('it should not raise any error', function () {
    browser.url('/');
    browser.click('button=Cerrar');
    
    browser.timeoutsAsyncScript(60000);
    browser.executeAsync(loadScript);
   
    browser.timeoutsAsyncScript(60000);
    browser.executeAsync(unleashGremlins, 10000); //Juan Carlos, this timer was set to 50000, it was set to 10000 and it worked well
  });

  afterAll(function() {
	 browser.log('browser').value.forEach(function(log) { 
		 browser.logger.info(log.message.split(' ')[2]);
	 ;});
  });

});
