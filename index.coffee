Body = require 'body'
Clock = require 'clock'
Model = require 'model'

module.exports = class Simulation extends Model
  
  @is Body
  
  @has Clock
  
  @has Float32Array, as: 'gravity', default: -> new Float32Array 3
  
  @has Number, as: 'ticks', default: 0
  
  constructor: (args = {}) ->
    
    super
  
  start: ->
    
    @clock?.start()
    
    @clock?.on 'tick', (time) =>
      
      @tick time
  
  tick: (time) ->
    
    @each (key, child) =>
      
      child?.update? time
    
    @emit 'tick', time
    
    @ticks++
    
    return