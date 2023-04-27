function recruseiveDeactivate(element) {
	var childUls = element.getElementsByClassName("nested");
  for (var i = 0; i < childUls.length; i++) {
    childUls[i].classList.remove("active");
    recruseiveDeactivate(childUls[i])
  }
  var childButtons = element.getElementsByClassName("collapsible");
  for (var i = 0; i < childButtons.length; i++) {
    childButtons[i].classList.remove("active");
  }
}

function adjustHeight(parent_li, parent_ul, recursive) {
	// Get all li elements within the ul
	const allLiElements = parent_ul.querySelectorAll(':scope > li');

	// Get the last li element
	const lastLi = allLiElements[allLiElements.length - 1];
    const liHeight_half = lastLi.getBoundingClientRect().height/2;
    const liDim = lastLi.getBoundingClientRect();
    const parent_li_dim = parent_li.getBoundingClientRect();
	const correct_hi = liDim.bottom - parent_li_dim.bottom - liHeight_half;
	parent_ul.style.setProperty('--ul-before-margin', `${correct_hi}px`);

	parent_of_parent_ul = parent_ul.parentElement;
	if (recursive & parent_of_parent_ul.tagName === 'UL') {
		if (!parent_of_parent_ul.classList.contains("level-0")) {
			adjustHeight(parent_of_parent_ul.previousElementSibling, parent_of_parent_ul, true)
		} else {
			var root = document.getElementsByClassName("root")[0];
			adjustHeight(root, parent_of_parent_ul, true)
		}
	}
}

function changeActiveClass(element) {
  // this will toggle active for all descendents 
	element.classList.toggle("active");

	parent_li = element.parentElement.parentElement.parentElement;
	parent_ul = parent_li.nextElementSibling;
    parent_ul.classList.toggle("active");

    console.log("compare1")
    console.log(parent_ul)
	console.log(parent_li)
	console.log("compare2")


    adjustHeight(parent_li, parent_ul, true);

	if (element.classList.contains("active")) {
	    element.textContent = "";
	} else {
		element.textContent = "";
		recruseiveDeactivate(parent_ul)
	}
}

var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
	coll[i].addEventListener("click", function() {
		changeActiveClass(this);
	});
}

// the below is used to expand or collapse all descendents 
var isExpanded = false;
function activateAll() {
  
  // Get all nested lists in the document
  var nestedLists = document.getElementsByClassName("nested");


  // Loop through each nested list
  for (var i = 0; i < nestedLists.length; i++) {
    var nestedList = nestedLists[i];

    // Add the "active" class to the nested list
    if (!isExpanded) {
    	nestedList.classList.add("active");
    } else {
    	nestedList.classList.remove("active");
    }
  }

  var collapseButtons = document.getElementsByClassName("collapsible");

  for (var i = 0; i < collapseButtons.length; i++) {
    var collapseButton = collapseButtons[i];

    // Add the "active" class to the nested list
    if (!isExpanded) {
    	collapseButton.classList.add("active");
    } else {
    	collapseButton.classList.remove("active");
    }
  }


  isExpanded = !isExpanded
}


// Code to get sticky bar to show or hide 
// it will show once the person scrolls more than half the page
var stickyBar = document.querySelector('.sticky-bar');
var threshold = window.innerHeight * 0.5; // set the threshold to 50% of the viewport height

function onScroll() {
  if (window.pageYOffset > threshold) {
    stickyBar.classList.remove('bar-hidden');
  } else {
    stickyBar.classList.add('bar-hidden');
  }
}

window.addEventListener('scroll', onScroll);

window.onload = function() {
  var root = document.getElementsByClassName("root")[0];
  var level_0 = document.getElementsByClassName("level-0")[0];
  adjustHeight(root, level_0, false)
};