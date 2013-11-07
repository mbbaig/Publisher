self.port.on("show", function (arg) {
  var textArea = document.getElementById('edit-box');
  textArea.focus();
  textArea.value = self.options;
});