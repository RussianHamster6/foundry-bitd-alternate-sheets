import { Utils } from "./utils.js";

export const registerHandlebarsHelpers = function () {
  Handlebars.registerHelper("or", function (arg1, arg2) {
    if (typeof arg1 == "string") {
      arg1 = arg1.length > 0;
    }
    if (typeof arg2 == "string") {
      arg2 = arg2.length > 0;
    }
    return arg1 || arg2;
  });

  Handlebars.registerHelper("notempty", function (arg1) {
    return arg1.trim().length > 0;
  });

  // Handlebars.registerHelper('flexinput', function(field, ctx){
  //   switch (field.type) {
  //     case "img":
  //         return new Handlebars.SafeString(`<img src="${ctx[field.name]}" data-edit="img" title="${field.name}"/>`);
  //       break;
  //     case "number":

  //       break;
  //     case "editor":
  //       return Handlebars.helpers['editor']()

  //     default:
  //       break;
  //   }
  // });

  Handlebars.registerHelper(
    "inline-editable-text",
    function (
      editable,
      parameter_name,
      blank_value,
      current_value,
      uniq_id,
      context
    ) {
      let html = "";
      if (current_value?.length === 0 || !current_value) {
        current_value = blank_value;
      }
      html += `<input  data-input="character-${uniq_id}-${parameter_name}" name="${parameter_name}" type="hidden" value="${current_value}" placeholder="${blank_value}"><span class="inline-input" ${context.owner && editable ? 'contenteditable="true"' : null
        } spellcheck="false" data-target="character-${uniq_id}-${parameter_name}" data-placeholder="${blank_value}">${current_value}</span>`;
      return html;
    }
  );

  Handlebars.registerHelper("testing", function () {
    return "testing";
  });
  Handlebars.registerHelper(
    "fancyToggle",
    function (
      parameter_name,
      offIcon,
      onIcon,
      current_value,
      tooltip,
      uniq_id
    ) {
      let html = `
      <label class="fancyToggle" for="fancyToggle-${uniq_id}" data-tooltip="${tooltip}">
        <i class="fas ${offIcon}" style="display: ${current_value ? "none" : "inline"
        };"></i>
        <i class="fas ${onIcon}" style="display: ${current_value ? "inline" : "none"
        };"></i>
      </label>
        <input type="checkbox" style="" checked="${current_value}" id="fancyToggle-${uniq_id}" name="${parameter_name}" data-input="${uniq_id}-${parameter_name}" />
      `;
      return html;
    }
  );

  Handlebars.registerHelper("ifCond", function (v1, operator, v2, options) {
    switch (operator) {
      case "==":
        return v1 == v2 ? options.fn(this) : options.inverse(this);
      case "===":
        return v1 === v2 ? options.fn(this) : options.inverse(this);
      case "!=":
        return v1 != v2 ? options.fn(this) : options.inverse(this);
      case "!==":
        return v1 !== v2 ? options.fn(this) : options.inverse(this);
      case "<":
        return v1 < v2 ? options.fn(this) : options.inverse(this);
      case "<=":
        return v1 <= v2 ? options.fn(this) : options.inverse(this);
      case ">":
        return v1 > v2 ? options.fn(this) : options.inverse(this);
      case ">=":
        return v1 >= v2 ? options.fn(this) : options.inverse(this);
      case "&&":
        return v1 && v2 ? options.fn(this) : options.inverse(this);
      case "||":
        return v1 || v2 ? options.fn(this) : options.inverse(this);
      default:
        return options.inverse(this);
    }
  });

  Handlebars.registerHelper("clean-name", function (input) {
    return Utils.trimClassFromName(input);
  });

  Handlebars.registerHelper("owns-ability", function (actor, ability_name) {
    return actor.items.some((item) => item.name == ability_name);
  });

  Handlebars.registerHelper("times_from_2", function (n, block) {
    var accum = "";
    n = parseInt(n);
    for (var i = 2; i <= n; ++i) {
      accum += block.fn(i);
    }
    return accum;
  });

  Handlebars.registerHelper("item-equipped", function (actor, id) {
    let actor_doc = game.actors.get(actor._id);
    let equipped_items = actor_doc.getFlag(
      "bitd-alternate-sheets-deepcuts-edition",
      "equipped-items"
    );
    if (equipped_items) {
      let equipped = equipped_items.find((item) => item.id === id);
      return equipped;
    } else {
      return false;
    }
  });

  Handlebars.registerHelper("clean-html", function (html) {
    html = Utils.strip(html);
    return html ? new Handlebars.SafeString(html) : "";
  });

  Handlebars.registerHelper("times", function (n, block) {
    var accum = "";
    for (var i = 0; i < n; ++i) accum += block.fn(i);
    return accum;
  });

  Handlebars.registerHelper("md", function (input) {
    let md = window.markdownit();
    input = Utils.strip(input);
    let output_value = md.render(input);
    return output_value;
  });

  Handlebars.registerHelper(
    "editable-textarea",
    function (
      editable,
      parameter_name,
      blank_value,
      use_markdown = false,
      force_editable = false,
      current_value,
      uniq_id,
      context
    ) {
      let html = "";
      if (!current_value || current_value.length === 0) {
        // current_value = "Click the edit lock above to add character notes.";
      }
      let output_value = current_value;
      if (use_markdown) {
        var md = window.markdownit();
        output_value = md.render(current_value);
        // output_value = current_value;
      }
      if (force_editable || (context.owner && editable)) {
        html += `<textarea data-input="character-${uniq_id}-${parameter_name}" name="${parameter_name}" value="${current_value}" placeholder="${blank_value}">${current_value}</textarea>`;
      } else {
        html += `<div class="output">${output_value}</div>`;
      }
      return html;
    }
  );

  Handlebars.registerHelper("upper-first", function (input) {
    return input.charAt(0).toUpperCase() + input.slice(1);
  });
};
