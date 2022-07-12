const buttonWrapper = document.createElement('div')
const buttonHTML = '<a href="#" role="button" class="comment-button command-button" title="Edit Menu"><i aria-hidden="true" class="fa fa-bell fa-fw" style="text-align: center;"></i></a>'
buttonWrapper.innerHTML = buttonHTML
dingButton = buttonWrapper.firstChild

const menu = document.querySelector('.command-buttons')
menu.insertBefore(dingButton, menu.firstChild)