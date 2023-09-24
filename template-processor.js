// template processor JavaScript program
function TemplateProcessor(template) {
    this.template = template;
  }
  
  TemplateProcessor.prototype.fillIn = function (dictionary) {
    // Use a regular expression to find all instances of {{property}} in the template
    // and replace them with values from dictionary.
    return this.template.replace(/{{(.*?)}}/g, (match, property) => {
      // Check if the property exists in dictionary,if it isn't then replace with an empty string.
      return dictionary.hasOwnProperty(property) ? dictionary[property] : '';
    });
  };

  