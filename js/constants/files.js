var {spaces, fill} = require('../actions/utils')

var gc = (face, content) => ({face, content})
var c = (content) => gc(undefined, content)

var files = {
    ui: {
        parsedSource: [
            [c(fill('one line', 23, ' '))],
            [c(fill('another line', 23, ' '))],
            [c(fill('a third line', 23, ' ')), c('  '), gc('MenuBackground', 'menu' + spaces(13))],
            [c(fill('', 23, ' ')), c('  '), gc('MenuForeground', 'menu1' + spaces(5)), gc('MenuInfo', './file1')],
            [c(fill('', 23, ' ')), c('  '), gc('MenuBackground', 'menu2' + spaces(5)), gc('MenuInfo', './file1')],
            [c(fill('', 23, ' ')), c('  '), gc('MenuBackground', 'menu3' + spaces(5)), gc('MenuInfo', './file2')],
            [c(fill('', 23, ' '))],
            [c(fill('a line with ', 12, ' ')), gc('PrimarySelection', 'primary selectio'), gc('PrimaryCursor', 'n')],
            [c(fill('a line with ', 12, ' ')), gc('SecondarySelection', 'secondary selectio'), gc('SecondaryCursor', 'n')],
            [],
            [],
        ]
    },
    intro: {
        parsedSource: [
            [{"face":"title","content":"# kakoune-ink"}],
            [{"content":""}],
            [{"content":"A color scheme designer for kakoune"}],
            [{"content":""}],
            [{"face":"title","content":"## Getting started"}],
            [{"content":""}],[{"content":"1.  Pick a language above"}],
            [{"content":"2.  Click some part of this area to select a face"}],
            [{"content":"3.  Use the controls to the right to modify"}],
            [{"content":"4.  Export your theme"}]]
    },
    about: {
        parsedSource: [
            [{"face":"title","content":"# About"}],
            [{"content":""}],
            [{"content":"kakoune-ink is a kakoune color scheme designer. It comes with a light"}],
            [{"content":"and dark variant making it suitable for different lightning conditions. kakoune-ink"}],
            [{"content":"includes a default set of grayscale tones designed to be used on its own, or as"}],
            [{"content":"a base for new color schemes."}],
            [{"content":""}],
            [{"face":"title","content":"## Default color scheme"}],
            [{"content":""}],
            [{"content":"The default color scheme has been carefully designed to look balanced among"}],
            [{"content":"highlight faces, and between light and dark variants. It can be complemented"}],
            [{"content":"with system-wide adjustments such as using the brightness control of the"}],
            [{"content":"display, or software such as F.lux or Redshift to adapt the colors to the time"}],
            [{"content":"of day."}],
            [{"content":""}],
            [{"face":"title","content":"## Setting faces to transparent, or resetting faces to default"}],
            [{"content":""}],
            [{"content":"Shift-clicking an individual color makes it transparent. Alt-clicking resets an"}],
            [{"content":"individual color to its default value. Alt-clicking resets an individual post"}],
            [{"content":"process slider to zero."}],
            [{"content":""}],
            [{"face":"title","content":"# ~/.config/kak/kakrc"}],
            [{"content":""}],
            [{"face":"title","content":"## Load color scheme"}],
            [{"content":""}],
            [{"face":"string","content":"    colorscheme my-default"}],
            [{"content":""}],
            [{"face":"title","content":"# Implementation"}],
            [{"content":""}],
            [{"content":"kakoune-ink is built with React and HTML5 technologies. Local storage is used for"}],
            [{"content":"persisting the application state. Libraries are used sparingly, and the UI"}],
            [{"content":"components are implemented using plain CSS with a little help of Sass."}],
            [{"content":""}],
            [{"face":"title","content":"# Credits"}],
            [{"content":""}],
            [{"content":"kakoune-ink is based on vim.ink by Alexander Teinum."}]]
    },
    html: {
        parsedSource: [
            [{"face":"comment","content":"<!DOCTYPE html>"}],
            [{"content":"<"},{"face":"keyword","content":"html"},{"content":" "},{"face":"type","content":"lang"},{"content":"="},{"face":"string","content":"\"en\""},{"content":">"}],
            [{"content":"    <"},{"face":"keyword","content":"head"},{"content":">"}],
            [{"content":"        <"},{"face":"keyword","content":"meta"},{"content":" "},{"face":"type","content":"charset"},{"content":"="},{"face":"string","content":"\"utf-8\""},{"content":">"}],
            [{"content":"        <"},{"face":"keyword","content":"title"},{"content":">"},{"face":"title","content":"kakoune-ink"},{"content":"</"},{"face":"keyword","content":"title"},{"content":">"}],
            [{"content":"        <"},{"face":"keyword","content":"link"},{"content":" "},{"face":"type","content":"rel"},{"content":"="},{"face":"string","content":"\"stylesheet\""},{"content":" "},{"face":"type","content":"href"},{"content":"="},{"face":"string","content":"\"app.css\""},{"content":">"}],
            [{"content":"    </"},{"face":"keyword","content":"head"},{"content":">"}],
            [{"content":"    <"},{"face":"keyword","content":"body"},{"content":">"}],
            [{"content":"        <"},{"face":"keyword","content":"script"},{"content":" "},{"face":"type","content":"src"},{"content":"="},{"face":"string","content":"\"app.js\""},{"content":"></"},{"face":"keyword","content":"script"},{"content":">"}],
            [{"content":"    </"},{"face":"keyword","content":"body"},{"content":">"}],
            [{"content":"</"},{"face":"keyword","content":"html"},{"content":">"}]]
    },
    css: {
        parsedSource: [
            [{"face":"keyword","content":"html"},{"content":" {"}],
            [{"content":"    "},{"face":"identifier","content":"font-size"},{"content":": "},{"face":"value","content":"62.5"},{"face":"value","content":"%"},{"content":";"}],
            [{"content":"}"}],
            [{"content":""}],
            [{"face":"keyword","content":"body"},{"content":" {"}],
            [{"content":"    "},{"face":"identifier","content":"font-size"},{"content":": "},{"face":"value","content":"1.5"},{"face":"value","content":"em"},{"content":"; "},{"face":"comment","content":"/* Use em instead of rem because of Chrome bug */"}],
            [{"content":"}"}],
            [{"content":""}],
            [{"face":"keyword","content":"body"},{"face":"keyword","content":","},{"content":" "},{"face":"keyword","content":"button"},{"face":"keyword","content":","},{"content":" "},{"face":"keyword","content":"h1"},{"face":"keyword","content":","},{"content":" "},{"face":"keyword","content":"h2"},{"face":"keyword","content":","},{"content":" "},{"face":"keyword","content":"input"},{"face":"keyword","content":","},{"content":" "},{"face":"keyword","content":"textarea"},{"content":" {"}],
            [{"content":"    "},{"face":"identifier","content":"font-weight"},{"content":": "},{"face":"value","content":"300"},{"content":";"}],
            [{"content":"}"}],
            [{"content":""}],
            [{"face":"keyword","content":"body"},{"face":"keyword","content":","},{"content":" "},{"face":"keyword","content":"button"},{"face":"keyword","content":","},{"content":" "},{"face":"keyword","content":"input"},{"content":" {"}],
            [{"content":"    "},{"face":"identifier","content":"font-family"},{"content":": "},{"face":"string","content":"'Source Sans Pro'"},{"content":";"}],
            [{"content":"}"}],
            [{"content":""}],
            [{"face":"keyword","content":"pre"},{"face":"keyword","content":","},{"content":" "},{"face":"keyword","content":"textarea"},{"content":" {"}],
            [{"content":"    "},{"face":"identifier","content":"font-family"},{"content":": "},{"face":"string","content":"'Source Code Pro'"},{"content":";"}],
            [{"content":"}"}]]
    },
    javascript: {
        parsedSource: [
            [{"face":"identifier","content":"var"},{"content":" React "},{"face":"keyword","content":"="},{"content":" require("},{"face":"string","content":"'react'"},{"content":");"}],
            [{"face":"identifier","content":"var"},{"content":" {transitionFast} "},{"face":"keyword","content":"="},{"content":" require("},{"face":"string","content":"'../actions/transition'"},{"content":");"}],
            [{"face":"identifier","content":"var"},{"content":" {merge} "},{"face":"keyword","content":"="},{"content":" require("},{"face":"string","content":"'../actions/utils'"},{"content":");"}],
            [{"content":""}],
            [{"face":"identifier","content":"var"},{"content":" Right "},{"face":"keyword","content":"="},{"content":" React.createClass({"}],
            [{"content":"    render() {"}],
            [{"content":"        "},{"face":"identifier","content":"var"},{"content":" children;"}],
            [{"content":""}],
            [{"content":"        "},{"face":"keyword","content":"if"},{"content":" ("},{"face":"keyword","content":"this"},{"content":".props.activePane "},{"face":"keyword","content":"!=="},{"content":" "},{"face":"string","content":"'global'"},{"content":") {"}],
            [{"content":"            children "},{"face":"keyword","content":"="},{"content":" ["}],
            [{"content":"                SelectedGroup(merge("},{"face":"keyword","content":"this"},{"content":".props, {key: "},{"face":"value","content":"0"},{"content":", firstSection: "},{"face":"value","content":"true"},{"content":"})),"}],
            [{"content":"                Colors(merge("},{"face":"keyword","content":"this"},{"content":".props, {key: "},{"face":"value","content":"1"},{"content":"})),"}],
            [{"content":"                Highlight(merge("},{"face":"keyword","content":"this"},{"content":".props, {key: "},{"face":"value","content":"2"},{"content":"})),"}],
            [{"content":"                PostProcess(merge("},{"face":"keyword","content":"this"},{"content":".props, {key: "},{"face":"value","content":"3"},{"content":"})),"}],
            [{"content":"                ModifiedGroups(merge("},{"face":"keyword","content":"this"},{"content":".props, {key: "},{"face":"value","content":"4"},{"content":"}))];"}],
            [{"content":"        } "},{"face":"keyword","content":"else"},{"content":" {"}],
            [{"content":"            children "},{"face":"keyword","content":"="},{"content":" ["}],
            [{"content":"                Export(merge("},{"face":"keyword","content":"this"},{"content":".props, {key: "},{"face":"value","content":"0"},{"content":", firstSection: "},{"face":"value","content":"true"},{"content":"})),"}],
            [{"content":"                Components(merge("},{"face":"keyword","content":"this"},{"content":".props, {key: "},{"face":"value","content":"1"},{"content":"})),"}],
            [{"content":"                DangerZone(merge("},{"face":"keyword","content":"this"},{"content":".props, {key: "},{"face":"value","content":"2"},{"content":"}))];"}],
            [{"content":"        }"}],
            [{"content":""}],
            [{"content":"        "},{"face":"keyword","content":"return"},{"content":" React.DOM.aside({key: "},{"face":"string","content":"'aside'"},{"content":", children});"}],
            [{"content":"    }"}],
            [{"content":"});"}]]
    },
    c: {
        parsedSource: [
            [{"content":"#include "},{"face":"string","content":"<linux/init.h>"}],
            [{"content":"#include "},{"face":"string","content":"<linux/stat.h>"}],
            [{"content":"#include "},{"face":"string","content":"<linux/kdev_t.h>"}],
            [{"content":"#include "},{"face":"string","content":"<linux/syscalls.h>"}],
            [{"content":""}],
            [{"face":"comment","content":"/*"}],
            [{"face":"comment","content":" * Create a simple rootfs that is similar to the default initramfs"}],
            [{"face":"comment","content":" "},{"face":"comment","content":"*/"}],
            [{"face":"identifier","content":"static"},{"content":" "},{"face":"type","content":"int"},{"content":" __init default_rootfs("},{"face":"type","content":"void"},{"content":")"}],
            [{"content":"{"}],
            [{"content":"        "},{"face":"type","content":"int"},{"content":" err;"}],
            [{"content":""}],
            [{"content":"        err = sys_mkdir(("},{"face":"identifier","content":"const"},{"content":" "},{"face":"type","content":"char"},{"content":" __user __force *) "},{"face":"string","content":"\"/dev\""},{"content":", 0"},{"face":"value","content":"755"},{"content":");"}],
            [{"content":"        "},{"face":"keyword","content":"if"},{"content":" (err < "},{"face":"value","content":"0"},{"content":")"}],
            [{"content":"                "},{"face":"keyword","content":"goto"},{"content":" out;"}],
            [{"content":""}],
            [{"content":"        err = sys_mknod(("},{"face":"identifier","content":"const"},{"content":" "},{"face":"type","content":"char"},{"content":" __user __force *) "},{"face":"string","content":"\"/dev/console\""},{"content":","}],
            [{"content":"                        S_IFCHR | S_IRUSR | S_IWUSR,"}],
            [{"content":"                        new_encode_dev(MKDEV("},{"face":"value","content":"5"},{"content":", "},{"face":"value","content":"1"},{"content":")));"}],
            [{"content":"        "},{"face":"keyword","content":"if"},{"content":" (err < "},{"face":"value","content":"0"},{"content":")"}],
            [{"content":"                "},{"face":"keyword","content":"goto"},{"content":" out;"}],
            [{"content":""}],
            [{"content":"        err = sys_mkdir(("},{"face":"identifier","content":"const"},{"content":" "},{"face":"type","content":"char"},{"content":" __user __force *) "},{"face":"string","content":"\"/root\""},{"content":", 0"},{"face":"value","content":"700"},{"content":");"}],
            [{"content":"        "},{"face":"keyword","content":"if"},{"content":" (err < "},{"face":"value","content":"0"},{"content":")"}],
            [{"content":"                "},{"face":"keyword","content":"goto"},{"content":" out;"}],
            [{"content":""}],
            [{"content":"        "},{"face":"keyword","content":"return"},{"content":" "},{"face":"value","content":"0"},{"content":";"}],
            [{"content":""}],
            [{"face":"keyword","content":"out"},{"content":":"}],
            [{"content":"        printk(KERN_WARNING "},{"face":"string","content":"\"Failed to create a rootfs"},{"face":"keyword","content":"\\n"},{"face":"string","content":"\""},{"content":");"}],
            [{"content":"        "},{"face":"keyword","content":"return"},{"content":" err;"}],
            [{"content":"}"}],
            [{"content":"rootfs_initcall(default_rootfs);"}]]
    },
    java: {
        parsedSource: [
            [{"content":"package org.stagemonitor.core.metrics;"}],
            [{"content":""}],
            [{"content":"import com.codahale.metrics.Metric;"}],
            [{"content":"import com.codahale.metrics.MetricFilter;"}],
            [{"content":""}],
            [{"content":"import java.util.List;"}],
            [{"content":"import java.util.regex.Pattern;"}],
            [{"content":""}],
            [{"face":"identifier","content":"public"},{"content":" "},{"face":"identifier","content":"class"},{"content":" RegexMetricFilter "},{"face":"identifier","content":"implements"},{"content":" MetricFilter {"}],
            [{"content":""}],
            [{"content":"        "},{"face":"identifier","content":"private"},{"content":" "},{"face":"identifier","content":"final"},{"content":" List<Pattern> patterns;"}],
            [{"content":""}],
            [{"content":"        "},{"face":"identifier","content":"public"},{"content":" RegexMetricFilter(List<Pattern> patterns) {"}],
            [{"content":"                "},{"face":"type","content":"this"},{"content":".patterns = patterns;"}],
            [{"content":"        }"}],
            [{"content":""}],
            [{"content":"        @Override"}],
            [{"content":"        "},{"face":"identifier","content":"public"},{"content":" "},{"face":"type","content":"boolean"},{"content":" matches(String name, Metric metric) {"}],
            [{"content":"                "},{"face":"keyword","content":"for"},{"content":" ("},{"face":"identifier","content":"final"},{"content":" Pattern pattern : patterns) {"}],
            [{"content":"                        "},{"face":"keyword","content":"if"},{"content":" (pattern.matcher(name).matches()) {"}],
            [{"content":"                                "},{"face":"keyword","content":"return"},{"content":" "},{"face":"value","content":"true"},{"content":";"}],
            [{"content":"                        }"}],
            [{"content":"                }"}],
            [{"content":"                "},{"face":"keyword","content":"return"},{"content":" "},{"face":"value","content":"false"},{"content":";"}],
            [{"content":"        }"}],
            [{"content":"}"}]]
    },
    python: {
        parsedSource: undefined
    },
    ruby: {
        parsedSource: undefined
    },
    go: {
        parsedSource: undefined
    },
    rust: {
        parsedSource: undefined
    },
    haskell: {
        parsedSource: undefined
    },
    markdown: {
        parsedSource: undefined
    }
}

module.exports = files;
